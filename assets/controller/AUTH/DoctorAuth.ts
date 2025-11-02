

import utilis from "../utilis.ts";
import userModel from '../../model/userModel.ts';
import doctorModel from '../../model/Auth/DoctorAuth.ts';
import JWT from "../../services/JWT.js";

export default class {
    public utilis = new utilis();
    public userModel = new userModel();
    public doctorModel = new doctorModel();
    public JWT = new JWT();

    public async createDoctor(req: any, res: any) {
        try {
            const { doctorName, password, email, usertype } = req.body;

            const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{4,20}$/;
            if (!usernamePattern.test(doctorName))
                return this.utilis.sendResponse(res, 400, false, "Invalid username format", null);

            if (doctorName.length < 3)
                return this.utilis.sendResponse(res, 400, false, "Username too short", null);

            const checkMail = await this.userModel.getMail(email);
            if (checkMail.success && checkMail.data)
                return this.utilis.sendResponse(res, 400, false, "Email already exists", null);

            const patientTokenResponse = await this.utilis.generateAlphaNumeric();
            if (!patientTokenResponse.success)
                return this.utilis.sendResponse(res, 500, false, "Failed to generate token", null);

            const PatientToken = patientTokenResponse.data;


            const allowedTypes = ['Patient', 'Doctor', 'Admin'];
            if (!allowedTypes.includes(usertype))
                return this.utilis.sendResponse(res, 400, false, "Invalid user type", null);
            const userType = usertype;

            if (password.length < 6)
                return this.utilis.sendResponse(res, 400, false, "Password too short", null);
            if (password.length > 100)
                return this.utilis.sendResponse(res, 400, false, "Password too long", null);

            const passwordHash = await this.utilis.passwordHash(password);
            if (!passwordHash)
                return this.utilis.sendResponse(res, 500, false, "Password hashing failed", null);

            const insert = await this.doctorModel.createDoctor(doctorName, userType, email, PatientToken, passwordHash);
            if (!insert.success)
                return this.utilis.sendResponse(res, 500, false, "Creating user failed", null);

            const user = insert.data[0];
            const { password: _, ...safeUser } = user;

            const jwtToken = await this.JWT.generateToken({ doctorName, email, userType, patientToken: PatientToken });

            return this.utilis.sendResponse(res, 201, true, "Account created successfully", {
                token: jwtToken,
                user: safeUser
            });

        } catch (err: any) {
            console.error(err);
            return this.utilis.sendResponse(res, 500, false, "Internal server error", null);
        }
    }
}
