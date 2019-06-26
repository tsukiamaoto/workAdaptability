const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resumeSchema = new Schema({
    email: { type : String, required:true },
    password: { type: String,required: true },
    name: { type: String },
    phone: { type: String },
    address: { type: String }
});

module.exports = mongoose.model('Resume',resumeSchema);