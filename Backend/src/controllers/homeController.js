
const connection = require('../config/dataBase');

const {
    //TƯỚNG
    getAllChampions, getChampionbyId, deleteChampionById,

    //TRANG PHỤC
    getSkinById, deleteSkinById, getSkinUpdatebyId,

    //KỸ NĂNG
    getSkillPage, getSkillPassiveById, getSkillQById,
    getSkillWById, getSkillEById, getSkillRById,
    getUpdatePassiveById, getUpdateQById, getUpdateWById,
    getUpdateEById, getUpdateRById,

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

//Function Delelte TƯỚNG
const postHandleRemoveChampion = async (req, res) => {
    const id = req.params.id;

    try {
        await connection.query(
            `DELETE FROM SKIN WHERE champion_id IN (SELECT champion_id FROM CHAMPION WHERE champion_id = ?)`, [id]
        );
        await connection.query(
            `DELETE FROM SKILL WHERE champion_id IN (SELECT champion_id FROM CHAMPION WHERE champion_id = ?)`, [id]
        );
        await connection.query(
            `DELETE FROM SKILL WHERE id_skill = ?`, [id]
        );
        await connection.query(
            `DELETE FROM CHAMPION WHERE champion_id = ?`, [id]
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Lỗi Nội Server");
    };

    res.redirect('/');
};

// SKIN------------------------SKIN---------------------------------SKIN------------------------SKIN------------------------------SKIN

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

//SKILL-------------------------SKILL------------------SKILL----------------------SKILL-------------------------SKILL

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

    res.render('skill_passive.ejs', { listSkillPassive: skill_passive });
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

    res.render('skill_q.ejs', { listSkillQ: skill_q });
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

    res.render('skill_w.ejs', { listSkillW: skill_w });
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

    res.render('skill_e.ejs', { listSkillE: skill_e });
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

    res.render('skill_r.ejs', { listSkillR: skill_r });
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

//Trang UPDATE PASSIVE
const postEditPassivePage = async (req, res) => {
    const id_passive = req.params.id;

    let skill_passive = await getUpdatePassiveById(id_passive);

    res.render('edit-passive.ejs', { editSkillPassive: skill_passive });
};

//Function UPDATE PASSIVE
const postUpdatePassive = async (req, res) => {
    let idPassive = req.body.idPassive;
    let idSkill = req.body.idSkill;
    let passive_name = req.body.passive_name;
    let passive_detail = req.body.passive_detail;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        await connection.query(
            `UPDATE PASSIVE
            SET ten_skill_passive = ?, motaskill_passive = ?, hinhanh_passive = ?, id_skill = ? 
            WHERE id_passive = ?
        `, [passive_name, passive_detail, req.file.filename, idSkill, idPassive]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Trang UPDATE Q
const postEditQPage = async (req, res) => {
    const id_q = req.params.id;

    let skill_q = await getUpdateQById(id_q);

    res.render('edit-q.ejs', { editSkillQ: skill_q });
};

//Function UPDATE Q
const postUpdateQ = async (req, res) => {
    let idQ = req.body.idQ;
    let idSkill = req.body.idSkill;
    let q_name = req.body.q_name;
    let q_detail = req.body.q_detail;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        await connection.query(
            `UPDATE Q
            SET ten_skill_q = ?, motaskill_q = ?, hinhanh_q = ?, id_skill = ? 
            WHERE id_q = ?
        `, [q_name, q_detail, req.file.filename, idSkill, idQ]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Trang UPDATE W
const postEditWPage = async (req, res) => {
    const id_w = req.params.id;

    let skill_w = await getUpdateWById(id_w);

    res.render('edit-w.ejs', { editSkillW: skill_w });
};

//Function UPDATE W
const postUpdateW = async (req, res) => {
    let idW = req.body.idW;
    let idSkill = req.body.idSkill;
    let w_name = req.body.w_name;
    let w_detail = req.body.w_detail;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        await connection.query(
            `UPDATE W
            SET ten_skill_w = ?, motaskill_w = ?, hinhanh_w = ?, id_skill = ? 
            WHERE id_w = ?
        `, [w_name, w_detail, req.file.filename, idSkill, idW]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Trang UPDATE E
const postEditEPage = async (req, res) => {
    const id_e = req.params.id;

    let skill_e = await getUpdateEById(id_e);

    res.render('edit-e.ejs', { editSkillE: skill_e });
};

//Function UPDATE E
const postUpdateE = async (req, res) => {
    let idE = req.body.idE;
    let idSkill = req.body.idSkill;
    let e_name = req.body.e_name;
    let e_detail = req.body.e_detail;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        await connection.query(
            `UPDATE E
            SET ten_skill_e = ?, motaskill_e = ?, hinhanh_e = ?, id_skill = ? 
            WHERE id_e = ?
        `, [e_name, e_detail, req.file.filename, idSkill, idE]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Trang UPDATE R
const postEditRPage = async (req, res) => {
    const id_r = req.params.id;

    let skill_r = await getUpdateRById(id_r);

    res.render('edit-r.ejs', { editSkillR: skill_r });
};

//Function UPDATE R
const postUpdateR = async (req, res) => {
    let idR = req.body.idR;
    let idSkill = req.body.idSkill;
    let r_name = req.body.r_name;
    let r_detail = req.body.r_detail;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        await connection.query(
            `UPDATE R
            SET ten_skill_r = ?, motaskill_r = ?, hinhanh_r = ?, id_skill = ? 
            WHERE id_r= ?
        `, [r_name, r_detail, req.file.filename, idSkill, idR]
        );
        res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    //CHAMPION-----------CHAMPION-----------CHAMPION
    //RENDER
    getHomePage, getCreatePage, getUpdatePage,
    //CREATE
    postCreationChampions,
    //UPDATE
    postUpdateChampion,
    //DELETE
    postHandleRemoveChampion,


    //SKIN-----------SKIN----------------SKIN
    //RENDER
    postSkinPage, getUpdateSkinPage,
    getCreateSkinPage, postDeleteSkin,
    //CREATE
    postCreateSkin,
    //UPDATE
    postEditSkin,
    //DELETE

    postHandleRemoveSkin,

    //SKILL-------------SKILL--------------SKILL
    //RENDER
    postSkillPage, postSkillPassivePage, postSkillQPage,
    postSkillEPage, postSkillWPage, postSkillRPage,
    //CREATE
    postCreateSkillPassive, postCreateSkillQ, postCreateSkillW,
    postCreateSkillE, postCreateSkillR,
    //UPDATE
    postEditPassivePage, postUpdatePassive, postEditQPage,
    postUpdateQ, postEditWPage, postUpdateW,
    postEditEPage, postUpdateE, postEditRPage,
    postUpdateR,
}