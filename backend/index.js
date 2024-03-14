const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

mongoose.connect("mongodb://localhost/urlShortener", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  const shortUrl = await ShortUrl.find();
  res.send(shortUrl);
});

app.post("/shortUrls", async (req, res) => {
  const fullUrl = req.body.fullUrl;
  try {
    const createdShortUrl = await ShortUrl.create({ full: fullUrl });
    res.status(201).send(createdShortUrl);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).send("Error creating short URL");
  }
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.send(shortUrl);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
