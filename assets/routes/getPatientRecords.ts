import express from "express";
import medicalRecordController from "../controller/patientController/medicalRecords.ts";
import verifyKey from "../middlewares/verifyKey.ts";
import verifyTokenMiddleware from "../middlewares/verifyKey.ts";
import authentication from "../middlewares/roleMiddleWare.js";
import Utilis from "../controller/utilis.ts";

const router = express.Router();
const utilis = new Utilis();
const patientRecord = new medicalRecordController();

// 
router.get(
    "/checkPatientRecords/patient/:id", // param style
    verifyKey,                          // checks x-api-key
    verifyTokenMiddleware,              // verifies JWT from header
    authentication("patients"),          // ensures user role is patient
    async (req, res) => {
        try {
            //  patient_id from URL params
            const { id: patient_id } = req.params;


            // to prevent patients from viewing others' records
            if ((req as any).user.id !== Number(patient_id)) {
                return utilis.sendResponse(res, 403, false, "Unauthorized access", null);
            }

            // Controller call
            return await patientRecord.checkPatientRecordExist(req, res);
        } catch (error) {
            console.error(error);
            return utilis.sendResponse(res, 500, false, "Internal server error", null);
        }
    }
);

export default router;
