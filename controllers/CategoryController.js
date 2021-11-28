
const { Product } = require('../schemas/product');

exports.getCategories = async (req, res, next) => {

    const categories = await Product.distinct('category');
    res.status(200).send({ categories: categories });

};