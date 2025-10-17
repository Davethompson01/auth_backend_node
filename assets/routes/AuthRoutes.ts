


import Auth from '../controller/Auth.ts'
import verifyKey from '../middlewares/verifyKey.ts'
import authMiddleware from '../middlewares/AuthMiddleWare.ts'

export default class AuthRoute {

    public Auth = new Auth()

    private async parseBody(req) {
        return new Promise((resolve, reject) => {
            let data = "";
            req.on("data", chunk => {
                data += chunk;
            });
            req.on("end", () => {
                try {
                    resolve(JSON.parse(data || "{}"));
                } catch (err) {
                    reject(err);
                }
            });
        });
    }



    public async createUsersAccount(req, res) {
        if (req.url === "/createAccount" && req.method === "POST") {

            // verify API KEY
            if (!verifyKey(req, res)) {
                return false
            }

            // parse body
            const body = await this.parseBody(req);
            const { username, email, password } = body;

            //create logic
            const createUser = await this.Auth.createUser(username, email, password)
            // Send response
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(createUser));
            return true;
        }
        return false
    }
}