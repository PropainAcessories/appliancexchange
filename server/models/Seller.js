const mongoose = require('mongoose');
const { Schema } = mongoose;


const sellerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
});


const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
