const mongoose = require("mongoose");



const catcommSchmea = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});



module.exports = mongoose.model("Catcomm", catcommSchmea);
