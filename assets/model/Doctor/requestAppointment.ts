import dbOPS from "../dbOPS.js";
import utilis from "../../controller/utilis.js";
import patientModel from "../PatientModel/patientModels.js";

export default class requestAppointmentDoctor {

    protected sql = new dbOPS()
    protected utilis = new utilis()
    protected patientModels = new patientModel()

    public async checkAppointments(doctor_id: String) {
        const select = await this.sql.select(
            'appointments',
            ['patient_id', 'doctor_id', 'message'],
            'doctor_id = ?',
            [doctor_id]
        )
        if (!select) {
            return this.utilis.returnData(false, "Error checking DB", [])
        }
        return this.utilis.returnData(true, "Appointments successfully Fetched", select)

    }

    public async approvedAppointments(appointment_id: String) {

        const checkAppointments = await this.sql.exists('appointments', 'appointment_id = ?', [appointment_id])
        if (!checkAppointments) {
            return this.utilis.returnData(false, "Appointment doesn't exist", [])
        }

        const approvedAppointments = await this.checkAppointments(appointment_id)
        if (!approvedAppointments) {
            return this.utilis.returnData(false, "Error checking DB", [])
        }

        const update = await this.sql.update(
            'appointments',
            ['patient_id', 'doctor_id', 'appointment_approved = true'],
            'appointment_id = ?',
            [appointment_id]
        )
        if (!update) {
            return this.utilis.returnData(false, "Failed to update Appointment", [])
        }

    }

    public async updateAppointmentStatus(appointment_id: String) {

        const update = await this.sql.update(
            'appointment',
            ['appointment_status'],
            'appointment_id = ?',
            [appointment_id]
        )
        if (!update) {
            return this.utilis.returnData(false, "Failed to update Appointment", [])
        }
        return this.utilis.returnData(true, "Successfully updated Appointment", [])

    }


    public async fetchAllAppointment(doctor_id: String) {

        const select = await this.sql.select(
            'appointments',
            ['patient_id', 'appointment_id', 'doctor_id', 'message'],
            'doctor_id = ?',
            [doctor_id]
        )
        if (!select) {
            return this.utilis.returnData(false, "Failed to select Appointment", [])
        }
        return this.utilis.returnData(true, "  Successfully got doctors appointment", select)

    }

    
}