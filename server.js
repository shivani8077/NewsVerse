// ================================
// Import Required Packages
// ================================
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

// ================================
// Create Express App
// ================================
const app = express();

// ================================
// Middleware
// ================================
app.use(cors());
app.use(express.static("public"));

// ================================
// Home Route
// ================================
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// ================================
// Get Top Headlines / Category News
// ================================
app.get("/api/news", async (req, res) => {

    try {

        const category = req.query.category;

        let url = "";

        if (category) {

            url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;

        } else {

            url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

        }

        const response = await axios.get(url);

        res.json(response.data);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            status: "error",
            message: "Unable to fetch news"
        });

    }

});

// ================================
// Search News
// ================================
app.get("/api/search", async (req, res) => {

    try {

        const query = req.query.q;

        const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`;

        const response = await axios.get(url);

        res.json(response.data);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            status: "error",
            message: "Search failed"
        });

    }

});

// ================================
// Start Server
// ================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});