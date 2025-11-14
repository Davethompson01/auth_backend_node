import utilis from "../utilis.js";
import dbOPS from "../../model/dbOPS.js";
import medicalRecords from "../../model/PatientModel/medicalRecords.js";

export default class medicalRecordController {


    public sql = new dbOPS()
    public utilis = new utilis()
    protected medicalRecord = new medicalRecords()

    public async checkPatientRecordExist(req: any, res: any) {
        try {

            const patient_id = req.params.patient_id || req.query.patient_id || req.body.patient_id;
            if (!patient_id) {
                return this.utilis.sendResponse(res, 400, false, "patient_id is required", null);
            }

            const checkRecords = await this.medicalRecord.checkPatientRecordExist(patient_id);

            if (!checkRecords.success) {
                return this.utilis.sendResponse(res, 404, false, checkRecords.message || "No record found", null);
            }

            // returns back the medical record  
            return this.utilis.sendResponse(res, 200, true, "Patient record found", checkRecords.data);
        } catch (error) {
            console.error(error);
            return this.utilis.sendResponse(res, 500, false, "Internal server error", null);
        }
    }
}

