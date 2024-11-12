const mongoose=require('mongoose');
const initData=require ("./data.js");
const Listing=require("../models/listing.js");
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
const initDB=async()=>{
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data);
   console.log("Data inserted successfully");
}
initDB();