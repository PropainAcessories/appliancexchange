const mongoose = require('mongoose');
const { Schema } = mongoose;

const billingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
