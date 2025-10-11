import model from "../model/Auth.ts"
import userModel from "../model/UserModel.ts"
import JWT from "../services/JWT.js";
import utilis from "./utilis.ts"



export default class UserController {


    public model = new model();
    public userModel = new userModel();
    public utilis = new utilis();
    public JWT = new JWT()

    public async createUser(username: string, email: string, password: string) {

        // check mail
        let checkMail = await this.userModel.getMail(email)
        if (checkMail.success && checkMail.data) {
            return this.utilis.returnData(false, "Email already exists", null);
        }

        // create token if true
        let token = this.utilis.generateAlphaNumeric();

        // createpassword hash  
        let passwordHash = await this.utilis.passwordHash(password);

        // check username
        if (username.length < 3) {
            return this.utilis.returnData(false, "Username must be at least 3 characters", []);
        }
        if (username.length > 100) {
            return this.utilis.returnData(false, "Username must not exceed 100 characters", []);
        }

        const usernamePattern = /^(?=.*user)[a-zA-Z][a-zA-Z0-9_]{4,20}$/;
        if (!usernamePattern.test(username)) {
            this.utilis.returnData(false, "Invalid username format", null);
        }


        // insert into db
        let createUser = await this.model.createUser(username, email, passwordHash.data, token.data);

        if (!createUser.success) {
            return this.utilis.returnData(false, "Failed to create user", createUser);
        }
        return this.utilis.returnData(true, "User created successfully", createUser);
    }

    public async loginUser(email: string, plainPassword: string) {
        let select = await this.userModel.getUserByMail(email)
        if (!select.success || select.data.length === 0) {
            return this.utilis.returnData(false, "Can't find users", [])
        }

        // check results from the select function
        let results = select.data[0]
        let username = results.username
        let user_id = results.user_id
        let validPassword = await this.utilis.passwordVerify(results.password, plainPassword)
        if (!validPassword) {
            return this.utilis.returnData(false, "Wrong password", [])
        }

        // return data
        const token = await this.JWT.generateToken({email, username, user_id})
        if (!token) {
            return this.utilis.returnData(false, "Login failed", [])
        }

        return this.utilis.returnData(true, "Login successful", token)

        // return this.utilis.returnDatareturn this.utilis.returnData(true, "Login successful", token)


    }

}