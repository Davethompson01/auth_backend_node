import { IncomingMessage, ServerResponse } from "http";
// import { Security } from "../";
import verifyKey from '../middlewares/verifyKey.ts'

export default async function protectedRoute(req: IncomingMessage, res: ServerResponse) {
    const checkKey = verifyKey.verifyKey(req);

    if (!checkKey.success) {
        res.writeHead(checkKey.status ?? 401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: checkKey.message }));
        return;
    }

    
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, message: "Access granted!" }));
}

