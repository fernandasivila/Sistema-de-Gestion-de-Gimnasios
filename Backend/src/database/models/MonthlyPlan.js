const mongoose = require('mongoose');
const {Schema} = mongoose;

const monthlyPlanSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    availableDays: {
        type: Number,
        required: true
    },
}, { collection: 'monthly_plans'});

module.exports = mongoose.model('MonthlyPlan', monthlyPlanSchema);