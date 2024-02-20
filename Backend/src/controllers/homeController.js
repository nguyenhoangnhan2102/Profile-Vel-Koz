
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
    deleteSkinById,
    getSkinUpdatebyId,
    getSkillPage,
    getSkillById,
    getSkillPassive,
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
    let nickname = req.body.nickname;


    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO CHAMPION(name, nickname, image) VALUES (?, ?, ?)`, [champion_name, nickname, req.file.filename]
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

    console.log(idChampion);

    let skin = await getSkinById(idChampion);

    res.render('skin.ejs', { listSkin: skin });
}

const getUpdatePage = async (req, res) => {

    const idChampion = req.params.champion_id;

    let champion = await getChampionbyId(idChampion);

    res.render('edit.ejs', { championEdit: champion });
};

const postUpdateChampion = async (req, res) => {

    let idChampion = req.body.idChampion;
    let champion_name = req.body.champion_name;
    let nickname = req.body.nickname;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        let [results, fields] = await connection.query(
            `UPDATE CHAMPION
            SET name = ?, nickname = ?, image = ?     
            WHERE champion_id = ?
        `, [champion_name, nickname, req.file.filename, idChampion]
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
    const id = req.body.idChampion;

    await deleteChampionById(id)

    res.redirect('/');
};

const getCreateSkinPage = (req, res) => {
    res.render('create-skin.ejs');
};

const getUpdateSkinPage = async (req, res) => {

    const skinId = req.params.skin_id;

    let skin = await getSkinUpdatebyId(skinId);

    res.render('edit-skin.ejs', { skinEdit: skin });
};

const postEditSkin = async (req, res) => {

    let skin_id = req.body.skinId;
    let skin_name = req.body.skin_name;
    let championId = req.body.championId;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        let [results, fields] = await connection.query(
            `UPDATE SKIN
            SET tentrangphuc = ?, champion_id = ?, motatrangphuc = ?     
            WHERE skin_id = ?
        `, [skin_name, championId, req.file.filename, skin_id]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const postDeleteSkin = async (req, res) => {
    const skinId = req.params.skin_id;

    let skin = await getSkinUpdatebyId(skinId);

    res.render('delete-skin.ejs', { skinEdit: skin });
}

const postHandleRemoveSkin = async (req, res) => {
    const id = req.body.skin_id;

    await deleteSkinById(id);

    res.redirect('/');
};

const postSkillPage = async (req, res) => {
    const idSkill = req.params.id;

    let skill = await getSkillPage(idSkill);

    res.render('skill.ejs', { listSkill: skill });
}

const getUpdateSkill = async (req, res) => {
    const idSkill = req.params.id_skill;

    let skill = await getSkillById(idSkill);

    res.render('edit-skill.ejs', { editSkill: skill });
}

const postUpdateSkillPage = async (req, res) => {
    let skillId = req.body.skillId;
    let noitai = req.body.noitai;
    let q = req.body.q_skill;
    let w = req.body.w_skill;
    let e = req.body.e_skill;
    let r = req.body.r_skill;
    let championId = req.body.championId;
    // try {
    //     let [results, fields] = await connection.query(
    //         `UPDATE SKILL
    //         SET noitai = ?, q = ?, w = ? , e = ?, r = ?, champion_id = ?
    //         WHERE id_skill = ?
    //     `, [noitai, q, w, e, r, championId, skillId]
    //     );
    //     res.redirect("/");
    // } catch (error) {
    //     return res.status(500).json({ error: error.message });
    // }

    let [results, fields] = await connection.query(
        `UPDATE SKILL
            SET noitai = ?, q = ?, w = ? , e = ?, r = ?, champion_id = ?
            WHERE id_skill = ?
        `, [noitai, q, w, e, r, championId, skillId]
    );
    res.redirect("/");
}

const getCreateSkillPage = (req, res) => {
    res.render("create-skill.ejs");
}

const postCreateSkill = async (req, res) => {
    let noitai = req.body.noitai;
    let q = req.body.q;
    let w = req.body.w;
    let e = req.body.e;
    let r = req.body.r;
    let id_champion = req.body.id_champion;

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO SKILL (noitai, q, w, e, r, champion_id) VALUES (?, ?, ?, ?, ?, ?)`, [noitai, q, w, e, r, id_champion]
        );

        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const postSkillPassive = async (req, res) => {
    const id_passive = req.params.id;

    let q_skill = await getSkillPassive(id_passive);

    res.render('passive.ejs', { listSkillQ: q_skill });
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
    postHandleRemoveSkin,
    postSkillPage,
    getUpdateSkill,
    postUpdateSkillPage,
    getCreateSkillPage,
    postCreateSkill,
    postSkillPassive
}