const multer = require("multer");
const fs = require("fs"); //file system
const path = require("path"); // file path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filepath = "public/uploads";
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
    }
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    let extname = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let filename = basename + "-" + uniqueSuffix + extname;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    !file.originalname.match(
      /[.](jpg|jpeg|JPEG|JPG|PNG|webp|gif|GIF|png|WEBP|svg|SVG)$/
    )
  ) {
    cb(new error("Invalid file type"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 200000,
  },
});

module.exports = upload;
