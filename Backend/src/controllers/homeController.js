
const connection = require('../config/dataBase');

const {
    //TƯỚNG
    getAllChampions, getChampionbyId, deleteChampionById,

    //TRANG PHỤC
    getSkinById, deleteSkinById, getSkinUpdatebyId,

    //KỸ NĂNG
    getSkillPage, getSkillPassiveById, getSkillQById,
    getSkillWById, getSkillEById, getSkillRById,
} = require('../services/CRUD');

// CHAMPION------------------CHAMPION---------------------------CHAMPION----------------------CHAMPION--------------------------CHAMPION

//HOME PAGE
const getHomePage = async (req, res) => {
    let results = await getAllChampions();
    return res.render('home.ejs', { ListChampions: results });
};

//Trang Create TƯỚNG
const getCreatePage = (req, res) => {
    res.render('create.ejs');
};

//Function Create TƯỚNG
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

//Trang Update TƯỚNG
const getUpdatePage = async (req, res) => {

    const idChampion = req.params.champion_id;

    let champion = await getChampionbyId(idChampion);

    res.render('edit.ejs', { championEdit: champion });
};

//Function Update TƯỚNG
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

//Trang Delete TƯỚNG
const postDeleteChampion = async (req, res) => {
    const idChampion = req.params.champion_id;

    let champion = await getChampionbyId(idChampion);

    res.render("delete.ejs", { championEdit: champion });
};

//Function Delelte TƯỚNG
const postHandleRemoveChampion = async (req, res) => {
    const id = req.body.idChampion;

    await deleteChampionById(id)

    res.redirect('/');
};

// SKIN-------------------------------------------------------------------------------------------------------SKIN

//HOMEPAGE SKIN
const postSkinPage = async (req, res) => {
    const idChampion = req.params.id;

    let skin = await getSkinById(idChampion);

    res.render('skin.ejs', { listSkin: skin });
};

//Trang CREATE SKIN
const getCreateSkinPage = (req, res) => {
    const id = req.params.id;
    res.render('create-skin.ejs', { id });
};

//Function CREATE SKIN
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
        return res.redirect("/")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Trang UPDATE SKIN
const getUpdateSkinPage = async (req, res) => {

    const skinId = req.params.skin_id;

    let skin = await getSkinUpdatebyId(skinId);

    res.render('edit-skin.ejs', { skinEdit: skin });
};

//Function UPDATE SKIN
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

//Trang DELETE SKIN
const postDeleteSkin = async (req, res) => {
    const id = req.params.skin_id;

    await connection.query(
        ` DELETE FROM SKIN WHERE skin_id = ? `, [id]
    );

    return res.redirect('/');
};

//Function DELETE SKIN
const postHandleRemoveSkin = async (req, res) => {
    const id = req.body.skin_Id;

    await deleteSkinById(id);

    res.redirect('/');
};

//SKILL------------------------------------------------------------------SKILL

//HOMEPAGE SKILL
const postSkillPage = async (req, res) => {
    const idSkill = req.params.id;

    let skill = await getSkillPage(idSkill);

    res.render('skill.ejs', { listSkill: skill });
};

//Trang NỘI TẠI 
const postSkillPassivePage = async (req, res) => {
    const idSkillPassive = req.params.id;

    let skill_passive = await getSkillPassiveById(idSkillPassive);

    res.render('passive.ejs', { listSkillPassive: skill_passive });
};

//Function CREATE PASSIVE
const postCreateSkillPassive = async (req, res) => {
    const id_skill = req.body.id_skill;
    const skill_name = req.body.skill_name;
    const detail_skill = req.body.detail_skill;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO PASSIVE (ten_skill_passive, motaskill_passive, hinhanh_passive, id_skill) VALUES (?, ?, ?, ?)`,
            [skill_name, detail_skill, req.file.filename, id_skill]
        );
        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Trang Q
const postSkillQPage = async (req, res) => {
    const idSkillQ = req.params.id;

    let skill_q = await getSkillQById(idSkillQ);

    res.render('q.ejs', { listSkillQ: skill_q });
};

//Function CREATE Q
const postCreateSkillQ = async (req, res) => {
    const id_skill = req.body.id_skill;
    const skill_name = req.body.skill_name;
    const detail_skill = req.body.detail_skill;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO Q (ten_skill_q, motaskill_q, hinhanh_q, id_skill) VALUES (?, ?, ?, ?)`,
            [skill_name, detail_skill, req.file.filename, id_skill]
        );
        return res.redirect("/")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Trang W
const postSkillWPage = async (req, res) => {
    const idSkillW = req.params.id;

    let skill_w = await getSkillWById(idSkillW);

    res.render('w.ejs', { listSkillW: skill_w });
};

//Function CREATE W
const postCreateSkillW = async (req, res) => {
    const id_skill = req.body.id_skill;
    const skill_name = req.body.skill_name;
    const detail_skill = req.body.detail_skill;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO W (ten_skill_w, motaskill_w, hinhanh_w, id_skill) VALUES (?, ?, ?, ?)`,
            [skill_name, detail_skill, req.file.filename, id_skill]
        );
        return res.redirect("/")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Trang E
const postSkillEPage = async (req, res) => {
    const idSkillE = req.params.id;

    let skill_e = await getSkillEById(idSkillE);

    res.render('e.ejs', { listSkillE: skill_e });
};

//Function CREATE E
const postCreateSkillE = async (req, res) => {
    const id_skill = req.body.id_skill;
    const skill_name = req.body.skill_name;
    const detail_skill = req.body.detail_skill;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO E (ten_skill_e, motaskill_e, hinhanh_e, id_skill) VALUES (?, ?, ?, ?)`,
            [skill_name, detail_skill, req.file.filename, id_skill]
        );
        return res.redirect("/")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Trang R
const postSkillRPage = async (req, res) => {
    const idSkillR = req.params.id;

    let skill_r = await getSkillRById(idSkillR);

    res.render('r.ejs', { listSkillR: skill_r });
};

//Function CREATE R
const postCreateSkillR = async (req, res) => {
    const id_skill = req.body.id_skill;
    const skill_name = req.body.skill_name;
    const detail_skill = req.body.detail_skill;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        let [results, fields] = await connection.query(
            `INSERT INTO R (ten_skill_r, motaskill_r, hinhanh_r, id_skill) VALUES (?, ?, ?, ?)`,
            [skill_name, detail_skill, req.file.filename, id_skill]
        );
        return res.redirect("/")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    //CHAMPION
    getHomePage, postCreationChampions, getCreatePage,
    getUpdatePage, postUpdateChampion, postDeleteChampion,
    postHandleRemoveChampion,

    //SKIN
    postSkinPage, postCreateSkin, getCreateSkinPage,
    getUpdateSkinPage, postEditSkin, postDeleteSkin,
    postHandleRemoveSkin,

    //SKILL
    postSkillPage, postSkillPassivePage, postSkillQPage,
    postSkillEPage, postSkillWPage, postSkillRPage,
    postCreateSkillPassive, postCreateSkillQ, postCreateSkillW,
    postCreateSkillE, postCreateSkillR
}