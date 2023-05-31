const express = require("express");
const formidableMiddleware = require("./assets/middleware/formidableMiddleware");
const cors = require("cors");

const app = express();
require("dotenv").config();

const htmlFile = __dirname + "/public/index.html";

const assets = __dirname + "/assets";

app.use("/assets", express.static(assets));
app.use(formidableMiddleware);
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).sendFile(htmlFile);
});

app.post("/api/fileanalyse", async (req, res) => {
  const { upfile } = req.files;

  const response = {
    name: upfile.originalFilename,
    size: upfile.size,
    type: upfile.mimetype,
  };
  console.log(response);
  res.status(200).json(response);
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${listener.address().port}`);
});
