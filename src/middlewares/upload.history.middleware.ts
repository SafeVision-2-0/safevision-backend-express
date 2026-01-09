import multer, {type Multer} from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "src/uploads/history");
    },
    filename: (_req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, uniqueName + path.extname(file.originalname));
    },
});

export const uploadHistory:Multer = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(null, false); // <- ini kuncinya
        }
        cb(null, true);
    },
});