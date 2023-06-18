const mongoose = require("mongoose");

const {prodecSchemas}=require("./scurity/yupProdec");

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
    price: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    image:{
      type:Array,
      default: [''],
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

postSchmea.statics.proValidation = function (body) {
  return prodecSchemas.validate(body, { abortEarly: false });
};



module.exports = mongoose.model("Post", postSchmea);
