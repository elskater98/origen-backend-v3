
const { Cart } = require('../schemas/product');

exports.getCarts = async (req, res, next) => {

    const carts = await Cart.find({});
    res.status(200).send({ carts: carts });

};

exports.getCart = async (req, res, next) => {

    const carts = await Cart.findOne({ _id: req.params.id });
    res.status(200).send({ carts: carts });

};


exports.createCart = async (req, res, next) => {

    const carts = new Cart({ _id: req.params.id });
    res.status(200).send({ carts: cart });

};