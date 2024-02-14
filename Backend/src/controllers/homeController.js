
const connection = require('../config/dataBase');
// const { param } = require('../routes/web');
const {
    getAllChampions,
    getChampionbyId,
    updateChampionbyId,
    deleteChampionById
} = require('../services/CRUD');

const getHomePage = async (req, res) => {
    let results = await getAllChampions();
    return res.render('home.ejs', { ListChampions: results });
}

const postCreationChampions = async (req, res) => {

    let name = req.body.name;
    let image = req.body.image;

    console.log('name=', name, 'image', image);

    let [results, fields] = await connection.query(
        `INSERT INTO CHAMPION(name, image) VALUES (?, ?)`, [name, image]
    );

    console.log(">>>Check results: ", results);

    res.redirect("/");
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const idChampion = req.params.id;

    let champion = await getChampionbyId(idChampion);

    res.render('edit.ejs', { championEdit: champion });
}

const postUpdateChampion = async (req, res) => {

    let name = req.body.name;
    let image = req.body.image;
    let idChampion = req.body.idChampion;

    await updateChampionbyId(name, image, idChampion);

    // res.send("Updated a Champion succeed!!!");
    res.redirect("/");
}

const postDeleteChampion = async (req, res) => {
    const idChampion = req.params.id;

    let champion = await getChampionbyId(idChampion);
    res.render("delete.ejs", { championEdit: champion });
}

const postHandleRemoveChampion = async (req, res) => {
    const id = req.body.idChampion;

    await deleteChampionById(id)

    res.redirect('/');
}

module.exports = {
    getHomePage,
    postCreationChampions,
    getCreatePage,
    getUpdatePage,
    postUpdateChampion,
    updateChampionbyId,
    postDeleteChampion,
    postHandleRemoveChampion,
}