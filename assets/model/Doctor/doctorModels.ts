



import dbOPS from "../dbOPS.ts";
import utilis from "../../controller/utilis.ts";

export default class doctorModel {

    protected utilis = new utilis()
    protected sql = new dbOPS()

    public async getDoctorID(doctor_id: String) {

        const select = await this.sql.select
            (
                'doctors',
                ['patient_token', 'username', 'profile_img', 'email', 'number', 'refresh_token'],
                'doctor_id = ?',
                [doctor_id]
            )

        if (!select) {
            return this.utilis.requireData(false, "Can't find Doctor", [])
        }
        return this.utilis.requireData(true, "Select successful", select)

    }

    public async selectDoctorsRandom() {


        const random = await this.sql.selectRandom(
            'doctors',
            ['doctor_id', 'profile_img', 'doctor_token', 'username', 'blood_type', 'maritial_status'],
            10,
            'doctor_id'
        )
        if (!random) {
            return this.utilis.returnData(false, " fetch Patients from db failed", [])
        }
        return this.utilis.returnData(true, "fetch Patients from db successful", random)
    }


    public async searchForpatient(username: String) {

        const select = await this.sql.select(
            'appointment',
            ['patient_id,', 'username', 'message'],
            'username = ?',
            [username]
        )
        if (!username) {
            return this.utilis.returnData(false, "Can't find name", [])
        }
        return this.utilis.returnData(true, " checking DB", select)

    }

    
}