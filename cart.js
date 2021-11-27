const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    product: {
        type: [ProductSchema]
    },
});

module.exports = mongoose.model('Cart', CartSchema);
