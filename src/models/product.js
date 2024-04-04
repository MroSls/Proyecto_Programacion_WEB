const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    brand: { type: String, required: true , maxlength: 50},
    title: { type: String, required: true , maxlength: 50},
    animalCategory: { type: String, required: true , maxlength: 50},
    productCategory: { type: String, required: true , maxlength: 50},
    description: { type: String, required: true , maxlength: 500},
    images: [{ type: String, required: true }],
    piece: { type: Number, required: true },
    stock: { type: Number, required: true },
    kilogram: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    expiration: { type: Date, required: true },
    status: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('product', productSchema);