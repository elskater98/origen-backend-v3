
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
    Product.findOne({ _id: req.params.id }).then((data) => {
        res.status(200).send({ product: data });
    }).catch((err) => {
        res.status(400).send({ error: err })
    });
};