
const { Product } = require('../schemas/product');

exports.getCategories = async (req, res, next) => {

    let categories = await Product.distinct('category');

    categories = categories.map((value) => {
        return { "name": value }
    });

    res.status(200).send({ categories: categories });

};