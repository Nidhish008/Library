const mongoose = require("mongoose");

async function DB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/library");
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = DB;
