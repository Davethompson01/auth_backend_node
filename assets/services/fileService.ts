import dbOPS from "../model/dbOPS.js";
import utilis from "../controller/utilis.js";
import auditLogModel from "../model/PatientModel/auditLog.js";
import shareFileModel from "../model/PatientModel/shareFile.js";
import path from "path";
import fs from "fs/promises";

export default class fileService {

    public sql = new dbOPS()
    public utilis = new utilis()
    public auditLogModel = new auditLogModel()
    public shareFileModel = new shareFileModel()

    public async upload(patient_id: number, file_name: string, file_path: string) {


        const insert = await this.sql.insert(
            'files',
            { patient_id, file_name, file_path }
        )

        if (!insert) {
            return this.utilis.returnData(false, "Insert into file table failed", [])
        }
        return await this.auditLogModel.recordLog({
            patient_id: patient_id,
            action: "uploaded file",
            file_id: insert.data[0].id
        });

    }

    // Share file
    public async shareFile(shared_by: number, shared_with: number, file_id: number, meta: any) {
        return await this.shareFileModel.shareFile(shared_by, shared_with, file_id, meta);
    }

    // Reshare file (chain share)
    public async reShareFile(current_user: number, new_target: number, file_id: number, meta: any) {
        // Check permission (only if current_user has it shared)
        const access = await this.sql.select("file_shares", ["*"], "file_id = ? AND shared_with = ?", [file_id, current_user]);
        if (!access.success || access.data.length === 0) {
            return this.utilis.returnData(false, "No permission to share this file");

        }
        // Proceed
        return await this.shareFileModel.shareFile(current_user, new_target, file_id, meta);
    }


    public async downloadFile(patient_id: number, file_id: number, meta: any) {
        const file = await this.sql.select("files", ["*"], "id = ?", [file_id]);
        if (!file.success || file.data.length === 0)
            return this.utilis.returnData(false, "File not found");

        const record = await this.auditLogModel.recordLog({
            patient_id,
            action: "downloaded file",
            file_id,
            // ip_address: meta.ip,
            user_agent: meta.agent,
        });

        // Optionally send file
        const filePath = file.data[0].file_path;
        return this.utilis.returnData(true, "Download successful", { filePath });
    }

}