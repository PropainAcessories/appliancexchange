const mongoose = require('mongoose');
const { Schema } = mongoose;


const saleSchema = new Schema({

});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
