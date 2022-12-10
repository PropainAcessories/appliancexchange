const mongoose = require('mongoose');
const { Schema } = mongoose;


const sellerSchema = new Schema({

});


const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
