const express = require('express')
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRoute = require('./routes/web');

const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//Config template engine
configViewEngine(app);

//Khai báo route
app.use('/', webRoute);

app.listen(port, hostname, () => {
    console.log(`Running app on http://${hostname}:${port}/`)
})