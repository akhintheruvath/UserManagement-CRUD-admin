const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");


const userSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        trim: true,
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    Password: {
        type: String,
        required: true,
        trim: true
    }
})

userSchema.plugin(validator);
module.exports = mongoose.model('User', userSchema);