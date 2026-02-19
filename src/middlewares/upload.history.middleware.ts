import multer, { type Multer } from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        const uploadPath = path.join(
            process.cwd(),
            "uploads",
            "history"
        );
        cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, uniqueName + path.extname(file.originalname));
    },
});

export const uploadHistory: Multer = multer({
    storage,
    limits: {
        fileSize: 4* 1024 * 1024, // 4MB
    },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(null, false);
        }
        cb(null, true);
    },
});