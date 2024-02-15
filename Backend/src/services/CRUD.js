const multer = require('multer');
const connection = require('../config/dataBase');

const getAllChampions = async (req, res) => {
    let [results, fields] = await connection.query('SELECT * FROM CHAMPION');
    return results;
};

const getChampionbyId = async (idChampion) => {
    let [results, fields] = await connection.query(
        "SELECT * FROM CHAMPION where id = ?", [idChampion],
    );

    let champion = results && results.length > 0 ? results[0] : {};

    return champion;
};

// const updateChampionbyId = async (req, res, name, idChampion) => {


// }

const deleteChampionById = async (id) => {
    try {
        let [results, fields] = await connection.query(
            `DELETE FROM CHAMPION WHERE id = ?`, [id]
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Lỗi Nội Server");
    }
}

module.exports = {
    getAllChampions,
    getChampionbyId,
    //updateChampionbyId,
    deleteChampionById,
}