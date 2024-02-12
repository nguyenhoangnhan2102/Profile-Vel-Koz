
const connection = require('../config/dataBase');

const getHomePage = (req, res) => {
    return res.render('home.ejs');
}

const getABC = (req, res) => {
    return res.render('home.ejs');
}

const postCreationChampions = (req, res) => {

    let name = req.body.id;
    let image = req.body.image;

    console.log('name=', name, 'image', image);


    // let { name, image } = req.body;


    connection.query(
        `INSERT INTO 
        CHAMPION(name, image)
        VALUES(?, ?)`,
        [name, image],
        function (err, results) {
            console.log(results);
        }
    );

    res.send('Created a champion!!!');
}

module.exports = {
    getHomePage,
    getABC,
    postCreationChampions,
}