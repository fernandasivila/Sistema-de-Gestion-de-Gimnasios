const mongoose = require('mongoose');
const {Schema} = mongoose;

const exerciseSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    set:{
        type: Number,
        required: true
    },
    rep:{
        type: Number,
        required: true
    },
    accessory:{
        type: String
    },
    instruction:{
        type: String,
        required: true
    },
    difficult:{
        type: String, //Principiante, Intermedio, Avanzado
        required: true
    },
    type:{
        type: String, //Cardio Musculacion
        required: true
    },
    images:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image',
        required: true
    }],
    muscleGroup:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MuscleGroup',
        required: true
    }
}, { collection: 'exercises'});

module.exports = mongoose.model('Exercise', exerciseSchema);