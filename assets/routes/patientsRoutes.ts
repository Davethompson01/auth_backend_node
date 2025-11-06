
import express, { request } from "express";
import patientModels from "../model/PatientModel/patientModels.js";
import requestAppointmentModel from "../model/PatientModel/requestAppointment.js";
import verifyKey from "../middlewares/verifyKey.js";
import authentication from "../middlewares/roleMiddleWare.js";
import utilis from "../controller/utilis.js";

const router = express.Router()
const patientModel = new patientModels()

const requestAppointment = new requestAppointmentModel()
const utlis = new utilis()


router.post('/getRandomPatients', verifyKey, authentication('Doctor'), async (req, res) => {

    try {
        const getPatients = await patientModel.selectPatientRandom()
        if (!getPatients) {
            return utlis.sendResponse(res, 401, false, "Failed to get patients", [])
        }
        return utlis.sendResponse(res, 201, true, "Select checked", getPatients)
    } catch (error) {
        return utlis.sendResponse(res, 401, false, "Failed to get patients", error)
    }
})