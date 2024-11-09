const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');  // Adjusted to ensure path accuracy

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

main();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.get("/textlisting", async (req, res) => {
    try {
        let sampleListing = new Listing({
            title: "Sample Text Listing",
            description: "This is a sample text listing.",
            price: 1200,
            location: "New York City",
            country: "United States",
        });
        
        await sampleListing.save();
        console.log("Sample listing was saved");
        res.send("Success");
    } catch (error) {
        console.error("Error saving sample listing:", error);
        res.status(500).send("Failed to save sample listing");
    }
});

// Start server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
