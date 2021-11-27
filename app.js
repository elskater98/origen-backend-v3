/* Imports */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const User = require('./schemas/user');
const user = require('./routes/user');
const authentication = require('./routes/authentication');
const bcrypt = require('bcrypt');
const { Product } = require('./schemas/product')
const Stock = require('./schemas/stock')
const { Cart } = require('./schemas/product');

/* Initialization*/
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "credentials": true
}));

/*Routes*/
app.use('/user', user);
app.use('/auth', authentication);

/*Connection MongoDB*/
mongoose.connect(config.mongo_db_uri, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed connection.'));
db.once('open', function () {
    console.log("Successfully connection.")
});

/* Server */
const port = config.port;
app.listen(port, () => {
    console.log('The server is running on ' + config.port + ' ...');
});

/* Initialize Admin */
User.find({}).countDocuments().then(async (count) => {
    if (count === 0) {
        let password = await bcrypt.hash('password', 10);
        const user = new User({ first_name: 'Origen', last_name: 'Challenge v3', email: 'origen@challenge.com', password: password, roles: ['Administrator'] });
        user.save();
        console.log("User: " + JSON.stringify(user) + " had been created successfully.")
    }
});

/* Inizialize Products*/
Product.find({}).countDocuments().then(async (count) => {
    if (count === 0) {
        product1 = new Product({ name: "RTX 3080 Ti", model: "Gigabyte", categoty: "hardware", price: 1 });
        product1.save();
    }
});

Stock.find({}).countDocuments().then(async (count) => {
    if (count === 0) {
        stock1 = new Stock({ product_id: "61a25dc24c9d3868916262a6", quantity: 100 })
        stock1.save();
    }
});

cart = new Cart({ products: [{ name: "RTX 3080 Ti", model: "Gigabyte", categoty: "hardware", price: 1 }] })
cart.save()


module.exports = app;
