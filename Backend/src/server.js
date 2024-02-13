const express = require('express')
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRoute = require('./routes/web');
const connection = require('./config/dataBase');


const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//Config template engine
configViewEngine(app);

//Config request.body
app.use(express.json()); //dành cho json
app.use(express.urlencoded({ extended: true })); //dành cho form data

//Kết nối CSDL
// connection.query(
//     'SELECT * FROM CHAMPION u',
//     function (err, results, fields) {
//         console.log(results);
//         console.log(fields);
//     }
// );

//Khai báo route
app.use('/', webRoute);

app.listen(port, hostname, () => {
    console.log(`Running app on http://${hostname}:${port}/`)
});