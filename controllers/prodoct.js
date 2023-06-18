const Post=require('../model/prodoct');
const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");


exports.prodectAdd=async (req,res,next)=>{
  const thumbnail = req.files ? req.files.thumbnail : {};
  const fileName = `${shortId.generate()}_${thumbnail.name}`;
  const uploadPath = `${appRoot}/public/uploads/prodec/thumbnails/${fileName}`;
   
  const fileNameimage = [];
  const image = req.files ? req.files.image : {};
  if(image)
      fileNameimage.push(`${shortId.generate()}_${image.name}`); 
  const uploadPathimage = `${appRoot}/public/uploads/prodec/image/${fileNameimage}`;
    
  try {
    
    req.body = { ...req.body, thumbnail,image };
      
    await Post.proValidation(req.body);
 
    await sharp(thumbnail.data)
    .jpeg({ quality: 80 })
    .toFile(uploadPath)
    .catch((err) =>  {
      const error = new Error(
      " مشکل در آپلود عکس اصلی"
  );
  error.statusCode = 422;
  throw error; });

   if(image){
  await sharp(image.data)
  .jpeg({ quality: 80 })
  .toFile(uploadPathimage)
  .catch((err) =>  {
    const error = new Error(
    "مشکل در آپلود عکس"
);
error.statusCode = 422;
throw error; });

    }


     await Post.create({
      ... req.body,
      thumbnail: fileName,
      image: fileNameimage,
     })
     
     res.status(201).json({message:"ارسال محصول موفقیت آمیز بود"});
  
  } catch (err) {
    next(err);
  }
     

}