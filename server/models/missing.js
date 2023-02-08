const mongoose = require('mongoose');

const missingSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    city: String,
    photo: String,
    description : String,
}, 
{ timestamps: true });

module.exports = mongoose.model('Missing', missingSchema);
