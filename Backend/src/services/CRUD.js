
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

const getSkinById = async (idChampion) => {
    let [results, fields] = await connection.query('SELECT * FROM SKIN WHERE champion_id = ?', [idChampion],);
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

// const deleteSkinById = async (idChampion) => {
//     // try {
//     //     let [results, fields] = await connection.query(
//     //         `DELETE FROM CHAMPION WHERE id = ?`, [id]
//     //     );
//     // }
//     // catch (error) {
//     //     console.error(error);
//     //     res.status(500).send("Lỗi Nội Server");
//     // }
//     let [results, fields] = await connection.query(
//         `DELETE FROM SKIN WHERE skin_id = ?`, [idChampion]
//     );
// };

module.exports = {
    getAllChampions,
    getChampionbyId,
    //updateChampionbyId,
    deleteChampionById,
    getSkinById,
    //getEditSkinById,
    //deleteSkinById,
    getSkinUpdatebyId,
}