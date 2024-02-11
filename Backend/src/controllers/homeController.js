
const connection = require('../config/dataBase');

const getHomePage = (req, res) => {
    return res.render('home.ejs');
}

const getABC = (req, res) => {
    return res.render('sample.ejs');
}

module.exports = {
    getHomePage, getABC
}