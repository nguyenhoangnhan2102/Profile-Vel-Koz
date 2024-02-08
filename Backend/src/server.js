const express = require('express')
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRoute = require('./routes/web');
const mysql = require('mysql2');

const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//Config template engine
configViewEngine(app);

//Kết nối CSDL
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'velkoz',
})

connection.query(
    'SELECT * FROM TUONG u',
    function (err, results, fields) {
        console.log(results);
        console.log(fields);
    }

)

//Khai báo route
app.use('/', webRoute);

app.listen(port, hostname, () => {
    console.log(`Running app on http://${hostname}:${port}/`)
})