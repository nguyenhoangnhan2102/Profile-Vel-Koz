
const connection = require('../config/dataBase');
const { getAllChampions } = require('../services/CRUD');

const getHomePage = async (req, res) => {
    let results = await getAllChampions();
    return res.render('home.ejs', { ListChampions: results });
}

const postCreationChampions = async (req, res) => {

    let name = req.body.name;
    let image = req.body.image;

    console.log('name=', name, 'image', image);

    // let { name, image } = req.body;

    // connection.query(
    //     `INSERT INTO 
    //     CHAMPION(name, image)
    //     VALUES(?, ?)`,
    //     [name, image],
    //     function (err, results) {
    //         console.log(results);
    //         res.send('Created a champion!!!');
    //     }
    // );

    let [results, fields] = await connection.query(
        `INSERT INTO CHAMPION(name, image) VALUES (?, ?)`, [name, image]
    );

    console.log(">>>Check results: ", results);

    res.send("Created a Champion succeed!!!");

    // connection.query(
    //     'SELECT * FROM CHAMPION u',
    //     function (err, results, fields) {
    //         console.log(results);
    //         console.log(fields);
    //     }
    //)
    // const [results, fields] = await connection.query('SELECT * FROM CHAMPION u');
    // console.log(">>>Check results: ", results);
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = (req, res) => {
    res.render('edit.ejs');
}

module.exports = {
    getHomePage,
    postCreationChampions,
    getCreatePage,
    getUpdatePage,
}