
const connection = require('../config/dataBase');

const getAllChampions = async (req, res) => {
    let [results, fields] = await connection.query('SELECT * FROM CHAMPION');
    return results;
};

const getChampionbyId = async (idChampion) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM CHAMPION WHERE champion_id = ?", [idChampion],
    );

    let champion = results && results.length > 0 ? results[0] : {};

    return champion;
};
const getListSkin = async () => {
    let [results, fields] = await connection.query(`Select * from SKIN`);
    return results;
}
const getSkinById = async (idChampion) => {
    let [results, fields] = await connection.query('SELECT * FROM SKIN WHERE champion_id = ?', [idChampion]);
    // let skin = results && results.length > 0 ? results[0] : {};
    return results;
};


const getSkillPassiveById = async (idSkillPassive) => {
    let [results, fields] = await connection.query('SELECT * FROM PASSIVE WHERE id_passive = ?', [idSkillPassive],);
    // let skin = results && results.length > 0 ? results[0] : {};
    return results;
};

const getSkillQById = async (idSkillQ) => {
    let [results, fields] = await connection.query('SELECT * FROM Q WHERE id_q = ?', [idSkillQ],);
    // let skin = results && results.length > 0 ? results[0] : {};
    return results;
};

const getSkillWById = async (idSkillW) => {
    let [results, fields] = await connection.query('SELECT * FROM W WHERE id_w = ?', [idSkillW],);
    // let skin = results && results.length > 0 ? results[0] : {};
    return results;
};

const getSkillEById = async (idSkillE) => {
    let [results, fields] = await connection.query('SELECT * FROM E WHERE id_e = ?', [idSkillE],);
    // let skin = results && results.length > 0 ? results[0] : {};
    return results;
};


const getSkillRById = async (idSkillR) => {
    let [results, fields] = await connection.query('SELECT * FROM R WHERE id_r = ?', [idSkillR],);
    // let skin = results && results.length > 0 ? results[0] : {};
    return results;
};

// const getEditSkinById = async (idChampion) => {
//     let [results, fields] = await connection.query(
//         "SELECT * FROM TRANGPHUC where champion_id = ?", [idChampion],
//     );

//     let champion = results && results.length > 0 ? results[0] : {};

//     return champion;
// };

// const getSkinById = async (req, res) => {
//     let [results, fields] = await connection.query('SELECT * FROM TRANGPHUC ');
//     return results;
// };

const deleteChampionById = async (id) => {
    try {
        await connection.query(
            `DELETE FROM SKIN WHERE champion_id IN (SELECT champion_id FROM CHAMPION WHERE champion_id = ?)`, [id]
        );
        await connection.query(
            `DELETE FROM SKILL WHERE champion_id IN (SELECT champion_id FROM CHAMPION WHERE champion_id = ?)`, [id]
        );
        await connection.query(
            `DELETE FROM CHAMPION WHERE champion_id = ?`, [id]
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Lỗi Nội Server");
    };
};

const getSkinUpdatebyId = async (skinId) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM SKIN WHERE skin_id = ?", [skinId],
    );

    let skin = results && results.length > 0 ? results[0] : {};

    return skin;
};

const deleteSkinById = async (id) => {
    let [results, fields] = await connection.query(
        ` DELETE FROM SKIN WHERE skin_id = ? `, [id]
    );
};

const getSkillPage = async (idSkill) => {
    let [results, fields] = await connection.query('SELECT * FROM SKILL WHERE id_skill = ?', [idSkill],);
    // let skin = results && results.length > 0 ? results[0] : {};
    return results;
};

const getSkillById = async (idSkill) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM SKILL WHERE id_skill = ?", [idSkill],
    );

    let skill = results && results.length > 0 ? results[0] : {};

    return skill;
};




module.exports = {
    getAllChampions,
    getChampionbyId,
    deleteChampionById,
    getSkinById,
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
}