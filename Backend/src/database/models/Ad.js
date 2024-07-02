const mongoose = require('mongoose');
const {Schema} = mongoose;

const adSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    body:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    img:{
        data: Buffer,
        contentType: String,
        required: true
    }
}, { collection: 'ads'});

module.exports = mongoose.model('Ad', adSchema);