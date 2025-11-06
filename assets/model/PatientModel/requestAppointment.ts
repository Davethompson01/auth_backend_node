
// import sql from "../sql.ts=";
import dbOPS from "../dbOPS.ts";
import utilis from "../../controller/utilis.ts";
import doctorModel from "../Doctor/doctorModels.ts";

export default class requestAppointmentModel {

    protected utilis = new utilis()
    protected sql = new dbOPS()
    protected doctorModel = new doctorModel()


    public async createAppointment(patient_id: String) {

        const { patients_id, doctors_id, appointment_date, message, status } = req.body

        const getRandomDoctors = await this.doctorModel.selectDoctorsRandom()
        if (!getRandomDoctors) {
            return this.utilis.returnData(false, "Couldn't fecth doctors", [])
        }

        const results = getRandomDoctors.data[0]
        let doctor_id = results.id

        // check if we have a duplicate
        const checkDuplicate = await this.sql.exists('appointment', 'patient_id', [patient_id])
        if (!checkDuplicate) {
            return this.utilis.returnData(false, "User has an Request already", checkDuplicate)
        }

        //
        const insert = await this.sql.insert(
            'appointment',
            { patients_id, doctors_id, appointment_date, message, status: "Pending" }
        )
        if (!insert) {
            return this.utilis.returnData(false, "Failed to create Appointment", [])
        }
        return this.utilis.returnData(true, "Appointment created successfully", insert.data);
    }

    public async cancelAppointment() {

        const dropAppointment = await this.sql.delete(
            'appointments', 'appointment_id = ?'
        )
        if (!dropAppointment) {
            return this.utilis.returnData(false, "Failed to delete Appointment", [])
        }
        return this.utilis.returnData(true, " Delete create Appointment", dropAppointment)
    }


    public async fetchAllAppointment(patient_id: String) {

        const select = await this.sql.select(
            'appointments',
            ['patient_id', 'appointment_id', 'doctor_id', 'message'],
            'patient_id = ?',
            [patient_id]
        )
        if (!select) {
            return this.utilis.returnData(false, "Failed to select Appointment", [])
        }
        return this.utilis.returnData(true, "  Successfully got patients appointment", select)

    }

    

}