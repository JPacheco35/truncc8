import Express  from "express";
import cors from "cors";
import Url from "./url.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = Express();
// numbers + lowercase + uppercase letters == 62
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

app.use(cors());
app.use(Express.json());

app.get("/api/hello/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});

app.post("/api/shorten/", async (req, res) => {
    const longURL = req.body.url;
    // console.log(longURL);

    if (!longURL) return res.status(400).json({error: "URL is required"});

    // Duplicate check
    const existing = await Url.findOne({longURL});
    if (existing) {
        return res.json({shortCode: existing.shortCode});
    }

    // each URL entered gets unique 6 char shortcode
    let shortCode = "";

    // generate 6 random alphanumeric characters
    for (let i = 0; i < 6; i++) {
        const randChar = Math.floor(Math.random() * chars.length);
        shortCode = chars[randChar] + shortCode;
        // console.log("short: " + shortCode)
    }

    // Save to DB
    const newUrl = new Url({shortCode, longURL});
    await newUrl.save();

    // return data
    res.json({shortCode: shortCode});
})

app.get("/api/:code/", async (req, res) => {
    const code = req.params.code;
    console.log(code);

    try {
        const urlEntry = await Url.findOne({ shortCode: code });
        if (!urlEntry) return res.status(404).json({ error: "URL not found" });

        // console.log("Redirecting to: " + urlEntry.longURL);
        res.redirect(urlEntry.longURL);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(8000, () => {
            console.log("Server running on port 8000");
        });
    })
    .catch((err) => console.log(err));