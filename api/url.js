import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortCode: { type: String, required: true, unique: true },   // 6-char short code
    longURL: { type: String, required: true, unique: true }, // original URL
    createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model("Url", urlSchema);

export default Url;