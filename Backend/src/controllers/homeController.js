
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
    getSkillPassiveById,
    getSkillQById,
    getSkillWById,
    getSkillEById,
    getSkillRById,
    getListSkin
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
        return res.redirect("/")
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
    console.log("check list skin:", skin)
    res.render('skin.ejs', { listSkin: skin });
};

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
    const id = req.params.id;
    res.render('create-skin.ejs', { id });
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
    const id = req.params.skin_id;
    console.log(id);
    // let skin = await getSkinUpdatebyId(skinId);
    await connection.query(
        ` DELETE FROM SKIN WHERE skin_id = ? `, [id]
    );

    return res.redirect('/');

};

const postHandleRemoveSkin = async (req, res) => {
    const id = req.body.skin_Id;

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
    let passive = req.body.passive;
    let detail_passive = req.body.detail_passive;
    let q = req.body.q;
    let detail_q = req.body.detail_q;
    let w = req.body.w;
    let detail_w = req.body.detail_w;
    let e = req.body.e;
    let detail_e = req.body.detail_e;
    let r = req.body.r;
    let detail_r = req.body.detail_r;
    let id_champion = req.body.id_champion;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        let [results, fields] = await connection.query(
            `INSERT INTO SKILL (passive, motaskill_passive, hinhanhskill_passive, q, motaskill_q, hinhanhskill_q, w, motaskill_w, hinhanhskill_w,
                e, motaskill_e, hinhanhskill_e, r, motaskill_r, hinhanhskill_r, champion_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [passive, detail_passive, req.file.filename, q, detail_q, req.file.filename, w, detail_w, req.file.filename,
                e, detail_e, req.file.filename, r, detail_r, req.file.filename, id_champion]
        );

        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const postSkillPassivePage = async (req, res) => {
    const idSkillPassive = req.params.id;

    let skill_passive = await getSkillPassiveById(idSkillPassive);

    res.render('passive.ejs', { listSkillPassive: skill_passive });
};

const postSkillQPage = async (req, res) => {
    const idSkillQ = req.params.id;

    let skill_q = await getSkillQById(idSkillQ);

    res.render('q.ejs', { listSkillQ: skill_q });
};
const postSkillWPage = async (req, res) => {
    const idSkillW = req.params.id;

    let skill_w = await getSkillWById(idSkillW);

    res.render('w.ejs', { listSkillW: skill_w });
};
const postSkillEPage = async (req, res) => {
    const idSkillE = req.params.id;

    let skill_e = await getSkillEById(idSkillE);

    res.render('e.ejs', { listSkillE: skill_e });
};
const postSkillRPage = async (req, res) => {
    const idSkillR = req.params.id;

    let skill_r = await getSkillRById(idSkillR);

    res.render('r.ejs', { listSkillR: skill_r });
};

module.exports = {
    getHomePage,
    postCreationChampions,
    getCreatePage,
    getUpdatePage,
    postUpdateChampion,
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
    postSkillPassivePage,
    postSkillQPage,
    postSkillEPage,
    postSkillWPage,
    postSkillRPage,
}