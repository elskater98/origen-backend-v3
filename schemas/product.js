const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    photo_url: {
        type: String,
    },
    name: {
        type: String,
        maxLength: 128,
        required: 'Name is required.',
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
    category: {
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
    name: {
        type: String,
        required: true
    },
    products: {
        type: [ProductSchema]
    },
    users: {
        type: [String]
    },
    colors: {
        type: [mongoose.Schema.Types.Mixed]
    },
    createdAt: {
        type: Date,
        default: new Date().toDateString()
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = { Product: mongoose.model('Product', ProductSchema), Cart: mongoose.model('Cart', CartSchema) };