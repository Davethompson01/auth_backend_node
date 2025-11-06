
import saveDocumedocuenmttsModel from "../../model/PatientModel/saveDocuments.ts";
import utilis from "../utilis.ts";
import { Request, Response } from "express";

export default class saveDocumentController {


    public Document = new saveDocumedocuenmttsModel()

    async uploadDocument(req: Request, res: Response) {
        try {
            const file = req.file;
            const user_id = Number(req.body.user_id);

            if (!file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }

            const result = await this.Document.saveDocument({
                user_id,
                file_name: file.originalname,
                file_path: file.filename,
                file_type: file.mimetype,
            });

            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(500).json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "File upload failed" });
        }
    }
}
