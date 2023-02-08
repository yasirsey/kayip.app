const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const app = express();

// Load environment variables from .env file
/*
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/missing
*/
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDB");
    }
});

// Middleware
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/missings", require("./controllers/missing"));
app.use('/public', express.static(__dirname + '/public'));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
