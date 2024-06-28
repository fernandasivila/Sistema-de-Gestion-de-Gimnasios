const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    personalInformation: {
        fisrtName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        dni: {
            type: String,
            required: true,
            unique: true
        },
        address:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: String,
            required: true
        },
        dateOfBirth:{
            type: Date,
            required: true
        }
    },
    photo: {
        type: String,
        required: true
    }
}, { collection: 'users'});

module.exports = mongoose.model('User', userSchema);