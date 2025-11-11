

import utilis from "../../controller/utilis.js";
import dbOPS from "../dbOPS.js";
// import patientModel from "./patientModels.js";
import auditLogModel from "./auditLog.js";


export default class shareFileModel {

    public audit = new auditLogModel()
    public utilis = new utilis()
    public sql = new dbOPS()


    public async shareFile(shared_by: number,
        shared_with: number,
        file_id: number,
        meta: { ip?: string; agent?: string } = {}) {


        // Check if file exists
        const file = await this.sql.select("files", ["*"], "id = ?", [file_id]);
        if (!file.success || file.data.length === 0)
            return this.utilis.returnData(false, "File not found");

        // Insert file share record
        const share = await this.sql.insert("file_shares", {
            file_id,
            shared_by,
            shared_with
        });

        // Record audit log
        if (share.success) {
            await this.audit.recordLog({
                patient_id: shared_by,
                action: `shared file`,
                file_id,
                target_user: shared_with,
                // ip_address: meta.ip,
                user_agent: meta.agent ?? "",
            });
        }

    }
}