const fs = require("fs");


const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");



const Cat=require('../model/cat');
const Blog=require('../model/blog');


exports.setCat=async(req,res,next)=>{

  try {
    const {titel}=req.body;

    await Cat.catValidation(req.body);

    if(!titel){
      const error = new Error(
        "فیلد عنوان الزامی میباشد"
    );
    error.statusCode = 422;
    throw error;
    }else{
    await Cat.create({titel});
    res.status(201).json({ message: " دسته بندی با موفقیت اضافه شد" })
    }
    
  } catch (err) {
    next(err);
  }
}

exports.getCat=async(req,res,next)=>{
    try {

      const cat=await Cat.find({}).sort('asc');
      console.log(cat);
      if(!cat){
        const error = new Error(
          "دسته بندی موجود نمی باشد"
      );
      error.statusCode = 422;
      throw error;
      }else{
        res.status(201).json({cat,message:"موفقیت آمیز بود"})
      }
      
    } catch (err) {
      next(err);
    }
}

exports.setblog=async(req,res,next)=>{
  const thumbnail = req.files ? req.files.thumbnail : {};
  const fileName = `${shortId.generate()}_${thumbnail.name}`;
  const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;

  try {
      req.body = { ...req.body, thumbnail };
      
      await Blog.blgValidation(req.body);
   
      await sharp(thumbnail.data)
      .jpeg({ quality: 80 })
      .toFile(uploadPath)
      .catch((err) => console.log(err));


       await Blog.create({
        ... req.body,
        thumbnail: fileName
       })
       
       res.status(201).json({message:"ارسال پست موفقیت آمیز بود"});
    
  } catch (err) {
    next(err);
    
  }

}

//   const upload = multer({
//       limits: { fileSize: 8000000 },
//       fileFilter: fileFilter,
//   }).single("imageget");

//   upload(req, res, async (err) => {
//       if (err) {
//           if (err.code === "LIMIT_FILE_SIZE") {
//               return res.status(422).json({
//                   error: "حجم عکس ارسالی نباید بیشتر از 8 مگابایت باشد",
//               });
//           }
//           console.log(req.files);
//           res.status(400).json({ error: err });
//       } else {
//           if (req.files) {
//               const fileName = `${shortId.generate()}_${
//                   req.files.image.name
//               }`;
//               await sharp(req.files.image.data)
//                   .jpeg({
//                       quality: 80,
//                   })
//                   .toFile(`./public/uploads/${fileName}`)
//                   .catch((err) => console.log(err));
//               res.status(200).json({
//                   image: `http://localhost:3000/uploads/${fileName}`,
//               });
//           } else {
//               res.status(400).json({
//                   error: "جهت آپلود باید عکسی انتخاب کنید",
//               });
//           }
//       }
//   });
// };