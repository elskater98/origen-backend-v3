const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        minLength: 1,
        maxLength: 32,
        required: 'First name is required.'
    },
    last_name: {
        type: String,
        minLength: 1,
        maxLength: 32,
        required: 'Last name is required.'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required.',
        validate: [validator.isEmail, 'Invalid email.']
    },
    password: {
        type: String,
        minLength: 4,
        maxLength: 64,
        required: 'Password is required.'
    },
    roles: [String],
    createdAt: {
        type: Date,
        default: new Date().toDateString()
    },
    enable: {
        type: Boolean,
        default: true
    },
    current_cart: {
        type: String
    },
    color: {
        type: String,
        default: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
});

module.exports = { User: mongoose.model('User', UserSchema), UserSchema: UserSchema };
