
const connection = require('../config/dataBase');
// const { param } = require('../routes/web');
const multer = require('multer');
const {
    getAllChampions,
    getChampionbyId,
    //updateChampionbyId,
    deleteChampionById,
    getSkinById,
    //getEditSkinById,
} = require('../services/CRUD');

const getHomePage = async (req, res) => {
    let results = await getAllChampions();
    return res.render('home.ejs', { ListChampions: results });
};

// const getSkinPage = async (req, res) => {

//     let results = await getSkinById();

//     return res.render('skin.ejs', { listSkin: results });
// };

const postCreationChampions = async (req, res) => {

    let champion_name = req.body.champion_name;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO CHAMPION(name, image) VALUES (?, ?)`, [champion_name, req.file.filename]
        );
        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const postCreateSkin = async (req, res) => {

    let skin_name = req.body.skin_name;
    let champion_id = req.body.champion_id;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO TRANGPHUC(tentrangphuc, motatrangphuc, champion_id) VALUES (?, ?, ?)`, [skin_name, req.file.filename, champion_id]
        );
        return res.render("skin.ejs");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const postSkinPage = async (req, res) => {
    const idChampion = req.params.id;

    let skin = await getSkinById(idChampion);

    res.render('skin.ejs', { listSkin: skin });
}

const getUpdatePage = async (req, res) => {
    const idChampion = req.params.id;

    let champion = await getChampionbyId(idChampion);

    res.render('edit.ejs', { championEdit: champion });
}

const postUpdateChampion = async (req, res) => {

    let idChampion = req.body.idChampion;
    let champion_name = req.body.champion_name;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        let [results, fields] = await connection.query(
            `UPDATE CHAMPION
            SET name = ?, image = ?     
            WHERE id = ?
        `, [champion_name, req.file.filename, idChampion]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const postDeleteChampion = async (req, res) => {
    const idChampion = req.params.id;

    let champion = await getChampionbyId(idChampion);
    res.render("delete.ejs", { championEdit: champion });
}

const postHandleRemoveChampion = async (req, res) => {
    const id = req.body.idChampion;

    await deleteChampionById(id)

    res.redirect('/');
};

const getCreateSkinPage = (req, res) => {
    res.render('create-skin.ejs');
};

const getUpdateSkinPage = async (req, res) => {
    const champion_id = req.params.champion_id;

    let [results, fields] = await connection.query(
        `SELECT TRANGPHUC WHERE champion_id = ?`, [champion_id]
    );
    res.render('edit-skin.ejs', { skinEdit: skin });
};

const postEditSkin = async (req, res) => {

    let skin_name = req.body.skin_name;
    let champion_id = req.body.champion_id;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        let [results, fields] = await connection.query(
            `UPDATE TRANGPHUC
            SET tentrangphuc = ?, motatrangphuc = ?     
            WHERE champion_id = ?
        `, [skin_name, req.file.filename, champion_id]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const postDeleteSkin = async (req, res) => {
    const champion_id = req.params.champion_id;
    let skin = await getChampionbyId(champion_id);
    res.render('delete-skin.ejs', { skinEdit: skin });
}
module.exports = {
    getHomePage,
    postCreationChampions,
    getCreatePage,
    getUpdatePage,
    postUpdateChampion,
    //updateChampionbyId,
    postDeleteChampion,
    postHandleRemoveChampion,
    postSkinPage,
    postCreateSkin,
    getCreateSkinPage,
    getUpdateSkinPage,
    postEditSkin,
    postDeleteSkin,
}