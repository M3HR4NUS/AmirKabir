const mongoose = require("mongoose");



const commSchmea = new mongoose.Schema({

    comment: {
        type: String,
        required: true,
    },
    catcom:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catcom",
    },

 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Comment", commSchmea);
