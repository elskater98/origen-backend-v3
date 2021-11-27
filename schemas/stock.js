const mongoose = require('mongoose');
const validator = require('validator');

const StockSchema = mongoose.Schema({
    product_id: {
        type: String,
        required: 'Product Id is required.',
        unique: true
    },
    quantity: {
        type: Number,
        required: 'Currency is required.',
        default: 0
    },
});

module.exports = mongoose.model('Stock', StockSchema);