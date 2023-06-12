const express = require('express');
const dotEnv = require("dotenv");
const fileUpload = require("express-fileupload");
var cors = require('cors')
var bodyParser = require('body-parser')

const path=require('path');

const connectDB = require("./config/db");
const { setHeaders } = require("./middlewares/headers");

const { errorHandler } = require("./middlewares/erorrs");

//* Load Config
dotEnv.config({ path: "./config/config.env" });

/* Database connection */
connectDB();

const app = express();

 
app.use(cors())


//* BodyPaser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(setHeaders);

//* View Engine
app.set("view engine", "ejs");
app.set("views", "views");


//* File Upload Middleware
app.use(fileUpload());


//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.use(require('./routers/home'))
app.use("/user",require('./routers/userruter'))
app.use("/admin",require('./routers/admin'))


//* Error Controller
app.use(errorHandler);

app.listen(5000, () => {
  console.log("run backend!");
});