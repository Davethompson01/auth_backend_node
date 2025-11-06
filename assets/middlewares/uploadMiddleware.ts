
import multer from "multer";
import path from "path";
export default function uploadMiddleware(req: any, res: any) {


    // Storage configuration
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "../../uploads/documents"));
        },
        filename: (req, file, cb) => {
            const uniqueName = `doc_${Date.now()}_${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        },
    });

    // File filter (validate file types)
    const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
        const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
        if (!allowed.includes(file.mimetype)) {
            return cb(new Error("Invalid file type"), false);
        }
        cb(null, true);
    };

    const upload = multer({
        storage,
        fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    });

    export default upload;

}