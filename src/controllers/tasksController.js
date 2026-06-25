const pool = require('../db/db');

const getAllTasks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = { getAllTasks}
