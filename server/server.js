import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const imageSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String },
});
const Image = mongoose.model("Image", imageSchema);

const upload = multer();

app.post("/upload", upload.single("image"), async (req, res) => {
  let img = new Image();
  img.img.data = Buffer.from(req.file.buffer.toString("base64"), "base64");
  img.img.contentType = req.file.mimetype;
  await img.save();
  res.status(201).send(img._id);
});

app.get("/image/:id", async (req, res) => {
  const img = await Image.findById(req.params.id);
  res.send(img.img.data.toString("base64"));
});

app.listen(5000, () => console.log("Server started on port 5000"));
