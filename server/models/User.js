const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
// Import stuff they're selling to when you get to it.
// Add other constraints to password later.
// Payment stuff likely goes here
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    role: {
        type: String,
        default: 'ROLE_MEMBER',
        enum: ['ROLE_ADMIN', 'ROLE_MEMBER', 'ROLE_SELLER']
    },
    billing: {
        type: Schema.Types.ObjectId,
        ref: 'Billing',
        default: null
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    orders: [Order.schema]
});

userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hashSync(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
