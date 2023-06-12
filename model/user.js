
const bcrypt =require("bcrypt");
const moongose=require('mongoose');

const {schema}=require('./scurity/yupuser')


const userSchema= new moongose.Schema({
  username:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
},
createdAt: {
    type: Date,
    default: Date.now,
},
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
  });
});


module.exports=moongose.model("User",userSchema);