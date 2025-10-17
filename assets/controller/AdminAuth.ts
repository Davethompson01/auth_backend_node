import model from "../model/Auth.ts"
import userModel from "../model/UserModel.ts"
import JWT from "../services/JWT.ts";
import utilis from "./utilis.ts"
import AuthAdmin from '../model/AuthAdmin.ts'


export default class AdmiAuthController {


    public model = new model();
    public userModel = new userModel();
    public utilis = new utilis();
    public JWT = new JWT()
    public AuthAdmin = new AuthAdmin();

    public async createAdmin(username: string, password: string, usertype: string, email: string) {
        // password hash
        if (password.length < 6 || !password) {
            return this.utilis.returnData(false, "Password to short", null)
        }
        const passwordHash = await this.utilis.passwordHash(password)
        if (!password) {
            return false
        }

        // check for email validation

        const emailCheck = await this.userModel.getMail(email)
        if (emailCheck.success) {
            return this.utilis.returnData(false, "Email already exsit", [])
        }

        // is admin ==== true
        const isAdmin = usertype


        //generate token 
        let generateAlphaNumeric = this.utilis.generateAlphaNumeric()
        let uniqueID = generateAlphaNumeric.data
        // validate username
        if (username.length < 3) {
            return this.utilis.returnData(false, "Username too short", username)
        }
        if (username.length > 100) {
            return this.utilis.returnData(false, "Username is long", username)
        }

        const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;
        if (!usernamePattern.test(username)) {
            return this.utilis.returnData(false, "Invalid username format", null);
        }


        const accountCreate = await this.AuthAdmin.adminsAccount(
            username, email, uniqueID, passwordHash, isAdmin
        )
        if (!accountCreate.success) {
            return this.utilis.returnData(false, "Failed to create user", null);
        }

        // delete the password
        //delete accountCreate.data.password;

        // remove password from the return
        const user = await accountCreate.data[0]
        const { password: _, ...safeUser } = user



        // generate jwt token
        const tokenJWT = await this.JWT.generateToken({ username, isAdmin, email, uniqueID })
        return this.utilis.returnData(true, "Account created successfully", {
            token: tokenJWT,
            user: safeUser,
        });
    }

}