const mongoose = require('mongoose');
const {Schema} = mongoose;

const memberSchema = new Schema({
    state:{
        type: String,
        required: true
    },
    routines:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Routine',
        required: true
    }],
    progress:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Progress',
        required: true
    }],
    mounthlyPlan:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MonthlyPlan',
        required: true
    },
    img:{
        data: buffer,
        contentType: String,
        required: true
    }
}, { collection: 'members'});

module.exports = User.discriminator('Member', memberSchema);