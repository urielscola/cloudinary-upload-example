const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

const { multerUploads, dataUri } = require("./multerUploads");
const { uploader, cloudinaryConfig } = require("./cloudinary");

app.use(cors());

app.get("/", (_, res) => res.sendFile("./index.html", { root: __dirname }));

app.post("/upload", multerUploads, async (req, res) => {
  try {
    if (req.files && req.files.length) {
      cloudinaryConfig();
      const promises = req.files.map(file => {
        const base64File = dataUri(file).content;
        return uploader.upload(base64File);
      });

      const uploadedFiles = await Promise.all(promises);
      const urls = uploadedFiles.map(file => file.url);
      return res.status(201).json({ urls });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("oopsie");
  }
});

app.listen(process.env.PORT);
