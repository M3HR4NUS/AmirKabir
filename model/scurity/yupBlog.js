const Yup = require("yup");

exports.blogschemas = Yup.object().shape({
    title: Yup.string()
        .required("عنوان پست الزامی می باشد")
        .min(5, "عنوان پست نباید کمتر از 5 کارکتر باشد")
        .max(100, "عنوان پست نباید بیشتر از 100 کاراکتر باشد"),
    des: Yup.string().required("پست جدید باید دارای محتوا باشد"),
    thumbnail: Yup.object().shape({
        name: Yup.string().required("عکس بلاگ الزامی می باشد"),
        size: Yup.number().max(5000000, "عکس نباید بیشتر از 5 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(
            ["image/jpeg", "image/png"],
            "تنها پسوندهای png و jpeg پشتیبانی می شوند"
        ),
    }),
});
