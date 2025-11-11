

import { Request, Response } from "express";
import fileService from "../services/fileService.js";
import utilis from "./utilis.js";

export default class FileController {

    public FileService = new fileService()
    public utilis = new utilis()

    public async upload(req: Request, res: Response) {
        const { user_id, file_name, file_path } = req.body;
        const result = await this.FileService.upload(user_id, file_name, file_path);
        return this.utilis.sendResponse(res, 201, true, "Sucessfuly request", result)
    }

    public async share(req: Request, res: Response) {
        const { shared_by, shared_with, file_id } = req.body;
        const meta = { ip: req.ip, agent: req.headers["user-agent"] };
        const result = await this.FileService.shareFile(shared_by, shared_with, file_id, meta);
        return this.utilis.sendResponse(res, 201, true, "Sucessfuly request", result)
    }

    public async reShare(req: Request, res: Response) {
        const { current_user, new_target, file_id } = req.body;
        const meta = { ip: req.ip, agent: req.headers["user-agent"] };
        const result = await this.FileService.reShareFile(current_user, new_target, file_id, meta);
        // res.status(result.success ? 200 : 400).json(result);
        return this.utilis.sendResponse(res, 201, true, "Sucessfuly request", result)

    }

    public async download(req: Request, res: Response) {
        const { user_id, file_id } = req.query as any;
        const meta = { ip: req.ip, agent: req.headers["user-agent"] };
        const result = await this.FileService.downloadFile(Number(user_id), Number(file_id), meta);

        if (!result.success) return res.status(404).json(result);

        return this.utilis.sendResponse(res, 201, true, "Sucessfuly request", result)

    }
}
