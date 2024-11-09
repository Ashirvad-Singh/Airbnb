const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    location: String,
    country: String,
});

module.exports = mongoose.model('Listing', listingSchema);
