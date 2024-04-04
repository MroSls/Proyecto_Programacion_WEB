const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, maxlength: 50},
    surname: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true },
    image: { type: String, required: false , default: ''},
    role: { type: String, required: true, default: 'user' },
    status: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('users', userSchema);