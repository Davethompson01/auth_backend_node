import utilis from "../utilis.ts";
import userModel from '../../model/userModel.ts';
import patientModel from '../../model/Auth/PatientAuth.ts';
import JWT from "../../services/JWT.js";

export default class {
    public utilis = new utilis();
    public userModel = new userModel();
    public patientModel = new patientModel();
    public JWT = new JWT();

    public async createPatient(req: any, res: any) {
        try {
            const { patientName, password, email, usertype } = req.body;

            const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{4,20}$/;
            if (!usernamePattern.test(patientName))
                return this.utilis.sendResponse(res, 400, false, "Invalid username format", null);

            if (patientName.length < 3)
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

            const insert = await this.patientModel.createPatient(patientName, userType, email, PatientToken, passwordHash);
            if (!insert.success)
                return this.utilis.sendResponse(res, 500, false, "Creating user failed", null);

            const user = insert.data[0];
            const { password: _, ...safeUser } = user;

            const jwtToken = await this.JWT.generateToken({ patientName, email, userType, patientToken: PatientToken });

            return this.utilis.sendResponse(res, 201, true, "Account created successfully", {
                token: jwtToken,
                user: safeUser
            });

        } catch (err: any) {
            console.error(err);
            return this.utilis.sendResponse(res, 500, false, "Internal server error", null);
        }
    }


async loginPatient(req: any, res: any) {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return this.utilis.sendResponse(res, 400, false, "Email and password required", null);
  }

  // Fetch user
  const checkEmail = await this.userModel.getUserByMail(email);
  if (!checkEmail.success || !checkEmail.data.length) {
    return this.utilis.sendResponse(res, 404, false, "Email not found", null);
  }

  const user = checkEmail.data[0];

  // Verify password
  const passwordValid = await this.utilis.passwordVerify(user.password, password);
  if (!passwordValid) {
    return this.utilis.sendResponse(res, 401, false, "Invalid password", null);
  }

  // Generate tokens
  const payload = { user_id: user.user_id, username: user.username, mail: user.email };
  const accessToken = this.JWT.generateAccessToken(payload);
  const refreshToken = this.JWT.generateRefreshToken(payload);

  // Store refresh token in DB (optional)
  await this.userModel.saveRefreshToken(user.user_id, refreshToken);

  return this.utilis.sendResponse(res, 200, true, "Login successful", { accessToken, refreshToken });
}




}
