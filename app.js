const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js'); // Adjusted to ensure path accuracy
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const methodOverride = require('method-override');
const path = require("path");
const ejsmate=require("ejs-mate");

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
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views')); // Fixed the missing quotation mark
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.get("/listings", async (req, res) => {
    try {
        const allListing = await Listing.find({});
        res.render("listings/index.ejs", { allListing }); // Corrected to render properly
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).send("Error fetching listings");
    }
});

app.get("/listing/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show route
app.get("/listing/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const listing = await Listing.findById(id);
        res.render("listings/show.ejs", { listing });
    } catch (error) {
        console.error("Error fetching listing:", error);
        res.status(500).send("Error fetching listing");
    }
});

app.post("/listings", async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect(`/listings`); // Fixed the redirect path
    } catch (error) {
        console.error("Error saving listing:", error);
        res.status(500).send("Error saving listing");
    }
});

// Edit route
app.get("/listing/:id/edit", async (req, res) => {
    let id = req.params.id;
    try {
        const listing = await Listing.findById(id);
        res.render("listings/edit.ejs", { listing });
    } catch (error) {
        console.error("Error fetching listing:", error);
        res.status(500).send("Error fetching listing");
    }
});

// Update route

app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        res.redirect(`/listings/${id}`);
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).send("Error updating listing");
    }
});


app.delete("/listings/:id", async(req, res)=>{
    const { id } = req.params;
    try {
        await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
    } catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).send("Error deleting listing");
    }
    
}
)
// Start server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
