import multer from "multer";
import path from "path";

export default multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) === ".xlsx") {
      cb(null, true);
    } else {
      cb(new Error("Only .xlsx files are allowed!"));
    }
  },
});
