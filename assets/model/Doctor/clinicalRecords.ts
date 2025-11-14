import dbOPS from "../dbOPS.js";
import utilis from "../../controller/utilis.js";
import patientModel from "../PatientModel/patientModels.js";


export default class clinicalModel {

    protected sql = new dbOPS()
    protected utilis = new utilis()
    protected patientModels = new patientModel()


    public async createClincalRecords
        (clinical_id: number, patient_id: number, doctor_id: number, recorded_by: string,
            diagnosis: string, notes: string, vital: string
        ) {

        const insert = await this.sql.insert(
            'clinical_records',
            { clinical_id, patient_id, doctor_id, recorded_by, diagnosis, notes, vital }
        )
        if (!insert) {
            return this.utilis.returnData(false, "Failed to insert into db ", [])
        }
        return this.utilis.returnData(true, " insert into successful ", insert)
    }

    public async viewPatientClinical(patient_id: Number) {

        const select = await this.sql.select(
            'clinical_records',
            ['patient_id', 'doctor_id', 'recorded_by'],
            'patient_id = ?',
            [patient_id]
        )
        if (!select) {
            return this.utilis.returnData(false, "No record found for this patient", [])
        }
        return this.utilis.returnData(true, "insert into database successfull", select)

    }

    public async updateClinicalRecords(doctor_id: number) {
        const update = await this.sql.update(
            'clinical_records',
            ['patient_id', 'notes', 'diagnosis', 'vital'],
            'doctor_id = ?',
            [doctor_id]
        )
        if (!update) {
            return this.utilis.returnData(false, "Failed to update clinical records", [])
        }
        return this.utilis.returnData(true, "data successful updates", update)
    }


    

}