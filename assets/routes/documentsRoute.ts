

import { Router } from "express";
import saveDocumentController from "../controller/patientController/saveDocument.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

// POST /upload/document
router.post("/upload/document", upload.single("document"), (req, res) => {
    saveDocumentController.uploadDocument(req, res);
});

export default router;
