
const { Product } = require('../schemas/product');

exports.getProducts = async (req, res, next) => {

    const product = await Product.find({});
    res.status(200).send({ product: product });

};