import dbOPS from "../dbOPS.ts";
import utilis from "../../controller/utilis.js";

export default class patientModel {

    public sql = new dbOPS()
    public utilis = new utilis()

    async getPatientID(patient_id: Number) {
        const select = await this.sql.select(
            'patients',
            ['patient_token', 'username', 'profile_img', 'email', 'number', 'refresh_token'],
            "patient_id = ?",
            [patient_id]
        )

        if (!select.success) {
            return this.utilis.returnData(false, "Selecting from db Failed", select)
        } else {
            return this.utilis.returnData(true, `Select from ${patient_id} successful`, select)
        }
    }


    public async updatePatientBio(patient_id: number, updates: Record<string, any>) {

        const current = await this.getPatientID(patient_id);
        if (!current.success || !current.data.length) {
            return await this.utilis.returnData(false, "Patient not found", current);
        }

        const existing = await current.data[0];

        const updatedData = {
            username: updates.username ?? existing.username,
            profile_img: updates.profile_img ?? existing.profile_img,
            email: updates.email ?? existing.email,
            number: updates.number ?? existing.number,
        };

        //Update in DB
        const result = await this.sql.update(
            "patients",
            updatedData,
            "patient_id = ?",
            [patient_id]
        );


        if (!result.success) {
            return this.utilis.returnData(false, "Bio update failed", result);
        }

        return this.utilis.returnData(true, "Bio updated successfully", result);
    }

    public async selectPatientRandom() {


        const random = await this.sql.selectRandom(
            'patient',
            ['patient_id', 'profile_img', 'patient_token', 'username', 'blood_type', 'maritial_status'],
            10,
            'patient_id'
        )
        if (!random) {
            return this.utilis.returnData(false, " fetch Patients from db failed", [])
        }
        return this.utilis.returnData(true, "fetch Patients from db successful", random)
    }
    
}