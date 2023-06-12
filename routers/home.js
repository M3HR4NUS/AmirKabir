const { Router } = require("express");

const con=require("../controllers/home")

const router = new Router();

router.get('/',con.home)

module.exports = router;