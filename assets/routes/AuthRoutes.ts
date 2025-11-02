import express from "express";
import Auth from "../controller/AUTH/Patient.ts"
import docAuth from "../controller/AUTH/DoctorAuth.ts"
import verifyKey from "../middlewares/verifyKey.ts";
import utilis from "../controller/utilis.ts";

const router = express.Router();
const doctorAuth = new docAuth();
const utils = new utilis();

// This route will only create patient accounts
router.post("/createAccount/patient", verifyKey, async (req, res) => {
  try {
    const { patientName, email, password, userType } = req.body;

    // ensure the user type is patient
    if (userType && userType !== "Patient") {
      return utils.sendResponse(res, 400, false, "This route is only for patients", null);
    }

    // controller function
    const createPatient = await auth.createPatient(req, res);
    return res.status(201).json(createPatient);

  } catch (error) {
    console.error(error);
    return utils.sendResponse(res, 500, false, "Internal server error", null);
  }
});



// route will only be accesible by doctors
router.post("/createAccount/doctor", verifyKey, async (req, res) => {
  try {
    const { DoctortName, email, password, userType } = req.body;

    // ensure the user type is Doctor
    if (userType && userType !== "Doctor") {
      return utils.sendResponse(res, 400, false, "This route is only for Doctor", null);
    }

    // controller function
    const createDoctor = await doctorAuth.createDoctor(req, res);
    return res.status(201).json(createDoctor);

  } catch (error) {
    console.error(error);
    return utils.sendResponse(res, 500, false, "Internal server error", null);
  }
});




export default router;
