const Yup = require("yup");

exports.schemacat = Yup.object().shape({
  titel: Yup.string()
        .required("عنوان  الزامی می باشد")
        .min(2, "عنوان نباید کمتر از 2 کاراکتر باشد")
        .max(255, "عنوان نباید بیشتر از 255 کاراکتر باشد"),

});
