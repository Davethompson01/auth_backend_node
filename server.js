import http from "http";
import AuthRoute from "./assets/routes/AuthRoutes.ts";

class Server {
    constructor() {
        this.authRoute = new AuthRoute();
    }

    start() {
        http.createServer((req, res) => {
            if (req.url === "/" && req.method === "GET") {
                console.log("Request received");
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Hello from the server!");
            } else if (req.url === "/createuserauth" && req.method === "POST") {
                this.authRoute.createUsersAccount(req, res);
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not Found");
            }
        }).listen(3000, () => {
            console.log("Server running on port 3000");
        });
    }
}

new Server().start();
