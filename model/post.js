const mongoose = require("mongoose");



const postSchmea = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "public",
        enum: ["private", "public"],
    },
    thumbnail: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    comment_id:{
      type:string,
      required:true,
    },
    tag:{
      type:string,
      required:true,
    },
    cat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cat",
  },
});



module.exports = mongoose.model("Post", postSchmea);
