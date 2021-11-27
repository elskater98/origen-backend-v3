
const { Product } = require('../schemas/product');

exports.getProducts = async (req, res, next) => {

    if (req.query['category']) {
        let category = req.query['category']
        const product = await Product.find({ category: category });
        res.status(200).send({ product: product });
    } else {
        const product = await Product.find({});
        res.status(200).send({ product: product });
    }
};

exports.getProduct = async (req, res, next) => {

    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).send({ product: product });

};