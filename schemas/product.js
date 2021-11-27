const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 128,
        required: 'Name is required.',
        unique: true
    },
    model: {
        type: String,
        maxLength: 128,
        required: 'Model is required.'
    },
    description: {
        type: String,
        maxLength: 512
    },
    categoty: {
        type: String,
        maxLength: 64
    },
    price: {
        type: Number,
        required: 'Price is required.',
        min: 0
    },
    currency: {
        type: String,
        required: 'Currency is required.',
        default: "EUR"
    },
    createdAt: {
        type: Date,
        default: new Date().toDateString()
    },
    enable: {
        type: Boolean,
        default: true
    }
});

const CartSchema = mongoose.Schema({
    products: {
        type: [ProductSchema]
    },
});

module.exports = { Product: mongoose.model('Product', ProductSchema), Cart: mongoose.model('Cart', CartSchema) };