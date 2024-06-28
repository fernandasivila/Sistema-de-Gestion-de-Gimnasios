const mongoose = require('mongoose');
const nameDB = "gym_db";
const URI = `mongodb://localhost:27017/${nameDB}`

const dbconnect = () => {
    mongoose.connect(URI)
        .then(db => console.log("DB is connected"))
        .catch(err => console.log("Failed connection: ", err))
}

module.exports = dbconnect;