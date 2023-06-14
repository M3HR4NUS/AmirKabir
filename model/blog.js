const mongoose = require("mongoose");


const {blogschemas}=require('./scurity/yupBlog')


const blogSchmea = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
    },
    des: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    cat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cat",
  },

});

blogSchmea.statics.blgValidation = function (body) {
    return blogschemas.validate(body, { abortEarly: false });
  };


module.exports = mongoose.model("Blog", blogSchmea);
