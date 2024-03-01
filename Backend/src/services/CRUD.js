
const connection = require('../config/dataBase');

//CHAMPION-----------------------------------------------------------------CHAMPION

//Lấy tất cả TƯỚNG
const getAllChampions = async (req, res) => {
    let [results, fields] = await connection.query('SELECT * FROM CHAMPION');
    return results;
};

//Lấy id của TƯỚNG
const getChampionbyId = async (idChampion) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM CHAMPION WHERE champion_id = ?", [idChampion],
    );

    let champion = results && results.length > 0 ? results[0] : {};

    return champion;
};

//Xóa TƯỚNG
// const deleteChampionById = async (res, id) => {

// };

//SKIN----------------------------------------------------------SKIN

//Lấy id TƯỚNG trong TRANG PHỤC
const getSkinById = async (idChampion) => {
    let [results, fields] = await connection.query('SELECT * FROM SKIN WHERE champion_id = ?', [idChampion]);
    return results;
};

//Lấy skin_id của SKIN
const getSkinUpdatebyId = async (skinId) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM SKIN WHERE skin_id = ?", [skinId],
    );

    let skin = results && results.length > 0 ? results[0] : {};

    return skin;
};

//Xóa SKIN
const deleteSkinById = async (id) => {
    let [results, fields] = await connection.query(
        ` DELETE FROM SKIN WHERE skin_id = ? `, [id]
    );
};

//SKILL----------------------------------------------------------------------SKILL

//Hiện trang SKILL
const getSkillPage = async (idSkill) => {
    let [results, fields] = await connection.query('SELECT * FROM SKILL WHERE id_skill = ?', [idSkill],);
    return results;
};

//Lấy id_skill của SKIN
const getSkillById = async (idSkill) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM SKILL WHERE id_skill = ?", [idSkill],
    );

    let skill = results && results.length > 0 ? results[0] : {};

    return skill;
};

//Lấy id_passive của PASSIVE
const getSkillPassiveById = async (idSkillPassive) => {
    let [results, fields] = await connection.query('SELECT * FROM PASSIVE WHERE id_passive = ?', [idSkillPassive],);
    return results;
};

//Lấy id_q của Q
const getSkillQById = async (idSkillQ) => {
    let [results, fields] = await connection.query('SELECT * FROM Q WHERE id_q = ?', [idSkillQ],);
    return results;
};

//Lấy id_w của W
const getSkillWById = async (idSkillW) => {
    let [results, fields] = await connection.query('SELECT * FROM W WHERE id_w = ?', [idSkillW],);
    return results;
};

//Lấy id_e của E
const getSkillEById = async (idSkillE) => {
    let [results, fields] = await connection.query('SELECT * FROM E WHERE id_e = ?', [idSkillE],);
    return results;
};

//Lấy id_r của R
const getSkillRById = async (idSkillR) => {
    let [results, fields] = await connection.query('SELECT * FROM R WHERE id_r = ?', [idSkillR],);
    return results;
};

//Lấy id_passive để UPDATE
const getUpdatePassiveById = async (id_passive) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM PASSIVE WHERE id_passive = ?", [id_passive],
    );

    let skill_passive = results && results.length > 0 ? results[0] : {};

    return skill_passive;
};

//Lấy id_q để UPDATE
const getUpdateQById = async (id_q) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM Q WHERE id_q = ?", [id_q],
    );

    let skill_q = results && results.length > 0 ? results[0] : {};

    return skill_q;
};

//Lấy id_W để UPDATE
const getUpdateWById = async (id_w) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM W WHERE id_w = ?", [id_w],
    );

    let skill_w = results && results.length > 0 ? results[0] : {};

    return skill_w;
};

module.exports = {
    //CHAMPION
    getAllChampions, getChampionbyId, //deleteChampionById,

    //SKIN
    getSkinById, deleteSkinById, getSkinUpdatebyId,

    //SKILL
    getSkillPage, getSkillById, getSkillPassiveById,
    getSkillQById, getSkillWById, getSkillEById,
    getSkillRById, getUpdatePassiveById, getUpdateQById,
    getUpdateWById,
};