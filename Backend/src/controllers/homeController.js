
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
    //deleteSkinById,
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
    let id_champion = req.body.id_champion;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO SKIN (tentrangphuc, champion_id, motatrangphuc) VALUES (?, ?, ?)`, [skin_name, id_champion, req.file.filename]
        );
        // return res.render("skin.ejs");

        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const postSkinPage = async (req, res) => {
    const idChampion = req.params.id;

    console.log('>>>Check', req.params)

    let skin = await getSkinById(idChampion);

    res.render('skin.ejs', { listSkin: skin });
}

const getUpdatePage = async (req, res) => {

    const idChampion = req.params.champion_id;

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
            WHERE champion_id = ?
        `, [champion_name, req.file.filename, idChampion]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const postDeleteChampion = async (req, res) => {
    const idChampion = req.params.champion_id;
    let champion = await getChampionbyId(idChampion);
    res.render("delete.ejs", { championEdit: champion });
}

const postHandleRemoveChampion = async (req, res) => {
    const idChampion = req.body.idChampion;

    await deleteChampionById(idChampion)

    res.redirect('/');
};

const getCreateSkinPage = (req, res) => {
    res.render('create-skin.ejs');
};

const getUpdateSkinPage = async (req, res) => {
    const idSkin = req.params.skin_id;

    let [results, fields] = await connection.query(
        `SELECT * FROM SKIN WHERE skin_id = ?`, [idSkin]
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

// const postDeleteSkin = async (req, res) => {
//     const idChampion = req.params.champion_id;
//     let skin = await getChampionbyId(idChampion);
//     res.render("delete.ejs", { editSkin: skin });
// }

// const postHandleRemoveSkin = async (req, res) => {
//     const idChampion = req.body.idChampion;

//     await deleteSkinById(idChampion)

//     res.redirect('/');
// };

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
    //postDeleteSkin,
    //postHandleRemoveSkin,
}