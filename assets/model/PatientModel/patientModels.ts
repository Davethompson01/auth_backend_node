import dbOPS from "../dbOPS.ts";
import utilis from "../../controller/utilis.js";

export default class patientModel {

    public sql = new dbOPS()
    public utilis = new utilis()

    async getPatientID(patient_id: Number) {
        const select = await this.sql.select(
            'patients',
            ['patient_token', 'username', 'profile_img', 'email', 'refresh_token'],
            "patient_id = ?",
            [patient_id]
        )

        if (!select.success) {
            return this.utilis.returnData(false, "Selecting from db Failed", select)
        } else {
            return this.utilis.returnData(true, `Select from ${patient_id} successful`, select)
        }
    }


}