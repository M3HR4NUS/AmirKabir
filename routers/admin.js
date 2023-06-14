const { Router } = require("express");

const con=require("../controllers/admin")

const router = new Router();

router.post('/setCat',con.setCat);
router.get('/getCat',con.getCat);
router.delete('/deletecat/:id',con.deleteCat);

router.post('/sendblog',con.setblog);
router.put('/editblog/:id',con.editBlog);

router.delete('/deleteblog/:id',con.deleteBlog);

router.get('/getblog',con.getBlog);
router.get('/getblog/:id',con.getsingelBlog);


module.exports = router;