
const { Cart } = require('../schemas/product');
const { User } = require('../schemas/user')

exports.getCarts = async (req, res, next) => {
    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });

    if (curret_user.roles.includes('Administrator')) {
        const carts = await Cart.find({});
        res.status(200).send({ carts: carts });
    }

    const carts = await Cart.find({ users: curret_user._id });

    res.status(200).send({ carts: carts });
};

exports.getCart = async (req, res, next) => {
    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });

    if (curret_user.roles.includes('Administrator')) {
        const carts = await Cart.findOne({ _id: req.params.id });
    }

    const carts = await Cart.findOne({ _id: req.params.id, users: curret_user._id });

    res.status(200).send({ carts: carts });

};


exports.createCart = async (req, res, next) => {
    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });

    const cart = new Cart({ name: req.body['name'], products: req.body['products'], users: [curret_user._id], colors: req.body['colors'] });
    cart.save();
    res.status(201).send({ carts: cart });
};


exports.editCart = async (req, res, next) => {
    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });

    if (curret_user.roles.includes('Administrator')) {
        let cart = await Cart.findOneAndUpdate({ _id: req.params.id }, req.body);
    }

    let cart = await Cart.findOneAndUpdate({ _id: req.params.id, users: curret_user._id }, req.body);
    cart.save();
    res.status(200).send({ carts: cart });
};