const path = require("path");
const multer = require("multer");
const datauri = require("datauri");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array("files");

const dUri = new datauri();

const dataUri = file =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);

module.exports = { multerUploads, dataUri };
