import Utilis from "../controller/utilis.ts";

export default function authentication(requiredRole: string) {
    const response = new Utilis();

    return (req: any, res: any, next: Function) => {
        const user = req.user;

        if (!user) {
            return response.sendResponse(res, 401, false, "Unauthorized: Missing token or user data");
        }

        const userRole = user.role || user.data?.role;
        if (!userRole) {
            return response.sendResponse(res, 403, false, "Forbidden: Role not found in token");
        }

        if (userRole !== requiredRole) {
            return response.sendResponse(res, 403, false, "Forbidden: Insufficient permissions");
        }

        next(); 
    };
}
