const { Router } = require("express");

const {createUser,handleLogin,users}=require("../controllers/userController")

const router = new Router();

router.post('/register',createUser);
router.post('/login',handleLogin);
router.get('/usus',users);

module.exports = router;