const fs=require('fs');


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

exports.getCat=async(req,res,next)=>{    try {

      const cat=await Cat.find({}).sort('asc');
    
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

exports.deleteCat = async (req, res, next) => {
  try {

    await Cat.findByIdAndRemove(req.params.id);

              res.status(200).json({ message: "دسته بندی  با موفقیت پاک شد" });
     
    
  } catch (err) {
      next(err);
  }
};

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
      .catch((err) =>  {
        const error = new Error(
        "مشکل در آپلود عکس"
    );
    error.statusCode = 422;
    throw error; });


       await Blog.create({
        ... req.body,
        thumbnail: fileName
       })
       
       res.status(201).json({message:"ارسال پست موفقیت آمیز بود"});
    
  } catch (err) {
    next(err);
    
  }

}


exports.getBlog=async(req,res,next)=>{
  try {

    const blog=await Blog.find({}).sort('asc');
    if(!blog){
      const error = new Error(
        "بلاگی موجود نمی باشد"
    );
    error.statusCode = 422;
    throw error;
    }else{
      res.status(201).json({blog,message:"بلاگ با موفیقت دریافت  شد"});
    }
    

  } catch (err) {
    next(err);
  }
}

exports.getsingelBlog=async(req,res,next)=>{
  try {
      
    const blog=await Blog.findOne({_id : req.params.id});

    if(!blog){
      const error = new Error(
        "بلاگی موجود نمی باشد"
    );
    error.statusCode = 422;
    throw error;
    }else{
      res.status(201).json({blog,message:"بلاگ با موفیقت دریافت  شد"});
    }
    

  } catch (err) {
    next(err);
  }
}

exports.editBlog = async (req, res, next) => {
  const thumbnail = req.files ? req.files.thumbnail : {};
  const fileName = `${shortId.generate()}_${thumbnail.name}`;
  const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;

  const blog = await Blog.findOne({ _id: req.params.id });

  try {
      if (thumbnail != {}){
          await Blog.blgValidation({ ...req.body, thumbnail });
      }else{
        await Blog.blgValidation({
          ...req.body,
          thumbnail: {
              name: "placeholder",
              size: 0,
              mimetype: "image/jpeg",
          },
      });
       }
      if (!blog) {
          const error = new Error("بلاگی با این شناسه یافت نشد");
          error.statusCode = 404;
          throw error;
      }

          if (thumbnail.name) {
              fs.unlink(
                  `${appRoot}/public/uploads/thumbnails/${blog.thumbnail}`,
                  async (err) => {
                      if (err) console.log(err);
                      else {
                          await sharp(thumbnail.data)
                              .jpeg({ quality: 80 })
                              .toFile(uploadPath)
                              .catch((err) => console.log(err));
                      }
                  }
              );
          

          const { title,des } = req.body;
          blog.title = title;
          blog.des = des;
          blog.thumbnail = thumbnail.name ? fileName : blog.thumbnail;

          await blog.save();

          res.status(200).json({ message: "پست شما با موفقیت ویرایش شد" });
      }
  } catch (err) {
      next(err);
  }
};


exports.deleteBlog = async (req, res, next) => {
  try {
      const blog = await Blog.findByIdAndRemove(req.params.id);
      const filePath = `${appRoot}/public/uploads/thumbnails/${blog.thumbnail}`;

      fs.unlink(filePath, (err) => {
          if (err) {
              const error = new Error(
                  "خطای در پاکسازی عکس پست مربوطه رخ داده است"
              );
              error.statusCode = 400;
              throw error;
          } else {
              res.status(200).json({ message: "پست شما با موفقیت پاک شد" });
          }
      });
  } catch (err) {
      next(err);
  }
};