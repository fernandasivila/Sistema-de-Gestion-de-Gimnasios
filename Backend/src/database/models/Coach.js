const mongoose = require('mongoose');
const {Schema} = mongoose;

const coachSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    workArea:{
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    schedule:{
        type: String,
        required: true
    }
}, { collection: 'coaches'});

module.exports = mongoose.model('Coach', coachSchema);