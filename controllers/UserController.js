/* Imports */
const User = require('../schemas/user');
const bcrypt = require('bcrypt');

/*User Controllers*/


exports.getUsers = async (req, res, next) => {
    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });

    if (curret_user.roles.includes('Administrator')) {
        const users = await User.find({}, { password: 0, __v: 0 });
        res.status(200).send({ users: users });
    } else {
        res.status(403).send({ "fail": "Forbidden" })
    }
};

exports.getUser = async (req, res, next) => {
    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });
    if (curret_user.roles.includes('Administrator') || curret_user.email === req.params.id) {
        const user = await User.findOne({ email: req.params.id }, { password: 0, __v: 0 })
        user !== null ? res.status(200).send({ user: user }) : res.status(404).send({ message: "User not found with email: " + req.params.id });
    } else {
        res.status(403).send({ "fail": "Forbidden" })
    }
};


exports.createUser = async (req, res, next) => {

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        roles: req.body.roles
    });

    user.save().then(() => {
        res.status(201).send({ message: "User created." })
    }).catch((error) => {
        res.status(400).send({ error: error });
    });
}

exports.editUser = async (req, res, next) => {

    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });

    if (curret_user.roles.includes('Administrator') || curret_user.email === req.params.id) {

        User.findOne({ email: req.params.id }, { password: 0, __v: 0, createdAt: 0 }).then((user) => {

            if (Object.keys(req.body).includes('email')) {
                user['email'] = req.body.email;
            }

            if (Object.keys(req.body).includes('first_name')) {
                user['first_name'] = req.body.first_name;
            }

            if (Object.keys(req.body).includes('last_name')) {
                user['last_name'] = req.body.last_name;
            }

            if (Object.keys(req.body).includes('enable')) {
                user['enable'] = req.body.enable;
            }

            if (Object.keys(req.body).includes('roles')) {
                user['roles'] = req.body.roles;
            }

            User.updateOne({ email: req.params.id }, {
                $set: {
                    email: user.email,
                    enable: user.enable,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    roles: user.roles
                }
            }).then(() => {
                res.status(200).send({ message: "User updated." })
            }).catch((error) => {
                res.status(400).send({ error: error });
            });

        }).catch((error) => {
            res.status(404).send({ error: error });
        });
    } else {
        res.status(403).send({ "fail": "Forbidden" })
    }
}

exports.deleteUser = async (req, res, next) => {

    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });

    if (curret_user.roles.includes('Administrator') || curret_user.email === req.params.id) {
        User.deleteOne({ email: req.params.id }).then(() => {
            res.status(200).send({ message: "User deleted." });
        }).catch((error) => {
            res.status(400).send({ error: error });
        })
    } else {
        res.status(403).send({ "fail": "Forbidden" });
    }
}

exports.changePassword = async (req, res, next) => {

    const curret_user = await User.findOne({ email: req.user.email }, { password: 0, __v: 0 });

    if (curret_user.roles.includes('Administrator') || curret_user.email === req.body.email) {

        let old_password = req.body.old_password;
        let password = req.body.password;
        let _password = req.body._password;

        const user_password = await User.findOne({ email: req.body.email }, { password: 1 });

        if (await bcrypt.compare(old_password, user_password.password)) {
            if (password === _password) {
                User.updateOne({ email: req.body.email },
                    { $set: { password: await bcrypt.hash(req.body.password, 10), } }).then(() => {
                        res.status(200).send({ message: "Password updated successfully." });
                    }).catch((error) => {
                        res.status(500).send({ error: error });
                    })
            } else {
                res.status(400).send({ error: "Password do not match." });
            }
        } else {
            res.status(400).send({ error: "Password do not match." });
        }
    } else {
        res.status(403).send({ "fail": "Forbidden" });
    }
}
