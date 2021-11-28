const jwt = require('jsonwebtoken');
const config = require('./../config');

/* Middleware */

module.exports = { authorize };
function authorize(req, res, next) {
    /*
    Check if the toker provided from the user is valid.
    */
    const token = req.query.token || req.body.token || req.params.token || req.headers['authorization'] || req.headers['x-access-token'];
    if (!token) return res.status(401).send("Access denied. No token provided.");
    try {
        req.user = jwt.verify(token.replace('Bearer ', ''), config.secret_key);
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid Token" });
    }
}
