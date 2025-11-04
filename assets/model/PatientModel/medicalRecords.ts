
import patientModel from "./patientModels.js";
import utilis from "../../controller/utilis.js";
import dbOPS from "../dbOPS.js";

export default class medicalRecords {


    public patientBio = new patientModel()
    public utilis = new utilis()
    public sql = new dbOPS()



    public async checkPatientRecordExist(patient_id: any) {
        try {
            const param = [patient_id];
            const conditions = 'patient_id = ?';
            const checkMedicalTable = await this.sql.exists('medical_records', conditions, param);

            if (!checkMedicalTable) {
                return { success: false, message: "No record found", data: null };
            }

            // await the actual record fetch
            const recordResult = await this.checkMedicalRecord(patient_id);
            if (!recordResult.success) {
                return this.utilis.returnData(true, "Failed to get record", [])
            }

            return this.utilis.returnData(true, "Record Exist", recordResult)
        } catch (error) {
            console.error(error);
            return this.utilis.returnData(false, "Internal server error", [])
        }
    }

    public async checkMedicalRecord(patient_id: number) {
        try {
            const select = await this.sql.select(
                'medical_records',
                ['medical_records_id', 'patient_id', 'allergies', 'medications', 'current_conditions'],
                'patient_id = ?',
                [patient_id]
            );

            if (!select.success) {
                return this.utilis.returnData(false, "No record found", [])
            }

            // return data from the select query
            return this.utilis.returnData(true, `Select from ${patient_id} successful`, select.data)
        } catch (error) {
            console.error(error);
            return this.utilis.returnData(false, "Internal server error", [])
        }
    }

    
}



