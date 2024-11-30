const express = require("express");
const multer = require("multer");
const { processCSV } = require("./services/csvProcessor");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    await processCSV(req.file.path);
    res.status(200).send("CSV processing started");
  } catch (error) {
    console.error("Error processing CSV:", error);
    res.status(500).send("Error processing CSV");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
