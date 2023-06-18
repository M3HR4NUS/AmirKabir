const { Router } = require("express");

const {createUser,handleLogin,users}=require("../controllers/userController")
const product=require("../controllers/prodoct")

const router = new Router();

router.post('/register',createUser);
router.post('/login',handleLogin);
router.get('/usus',users);

//! add product
router.post('/product',product.prodectAdd)






module.exports = router;