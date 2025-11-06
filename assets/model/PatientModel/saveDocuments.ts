
import Database from "../../../config/database.ts";
import dbOPS from "../dbOPS.ts";
import utilis from "../../controller/utilis.ts";


export default class saveDocumentsModel {

    protected sql = new dbOPS()
    protected database = new Database()
    protected utlis = new utilis()

    public async saveDocuments(patient_id: String, fileName: String, filePath: String, fileType: String) {

        const insert = await this.sql.insert(
            'documents',
            { patient_id, fileName, filePath, fileType }
        )
        if (!insert) {
            return this.utlis.returnData(false, "Failed to insert Document into the Database")
        }
        return this.utlis.returnData(true, "Insert succesful", insert)
    }   
}