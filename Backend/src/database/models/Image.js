const mongoose = require('mongoose');
const {Schema} = mongoose;

const imageSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
}, { collection: 'images'});

module.exports = mongoose.model('Image', imageSchema);