import utilis from "../../controller/utilis.js";
import dbOPS from "../dbOPS.js";
import patientModel from "./patientModels.js";


export default class auditLogModel {

    public patientBio = new patientModel()
    public utilis = new utilis()
    public sql = new dbOPS()

    public async recordLog(data: {
        patient_id: Number, action: String, file_id: Number, target_user?: number
        // ip_address?: string,
        user_agent?: string;
    }) {

        const insert = await this.sql.insert(
            'patient_audit_logs',
            data
        )
        if (!insert) {
            return this.utilis.returnData(false, "insert failed", []);
        }
        return this.utilis.returnData(true, "Recorded Successful", insert);

    }
}