const mongoose = require('mongoose');
const {Schema} = mongoose;

const progressSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    photos:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    }]
}, { collection: 'progress'});

module.exports = mongoose.model('Progress', progressSchema);