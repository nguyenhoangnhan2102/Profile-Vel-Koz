const express = require('express')
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRoute = require('./routes/web');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/img')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Data.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single('myfile');

const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//Config template engine
configViewEngine(app);

//Config request.body
app.use(express.json()); //dành cho json
app.use(express.urlencoded({ extended: true })); //dành cho form data

//Khai báo route
app.use('/', webRoute);

//Upload file

app.listen(port, hostname, () => {
    console.log(`Running app on http://${hostname}:${port}/`)
});