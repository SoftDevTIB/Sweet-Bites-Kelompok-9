const mongoose = require('mongoose');

const postContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: false},
    message: {type: String, required: true},
}); 

const PostContact = mongoose.model('PostContact', postContactSchema);
module.exports = PostContact;