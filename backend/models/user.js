const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema, model } = mongoose;

const userSceham = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    image: {
        type: String,
        required: true
    },
    places: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Place'
    }]
});

userSceham.plugin(uniqueValidator);

module.exports = model('User', userSceham);
