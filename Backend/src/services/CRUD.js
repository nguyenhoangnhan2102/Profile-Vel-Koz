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

const updateChampionbyId = async (name, image, idChampion) => {
    let [results, fields] = await connection.query(
        `UPDATE CHAMPION
        SET name = ?, image = ?     
        WHERE id = ?
        `, [name, image, idChampion]
    );
}

const deleteChampionById = async (id) => {
    let [results, fields] = await connection.query(
        `DELETE FROM CHAMPION WHERE id = ?`, [id]
    );
}

module.exports = {
    getAllChampions,
    getChampionbyId,
    updateChampionbyId,
    deleteChampionById,
}