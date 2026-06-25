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

const createTask = async (req,res) => {
    try {
        const { title } = req.body;
        const result = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title]);

        res.status(201).json(result.rows[0]);
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error'});
    }
};

const updateTasks = async (req,res) => {
    try {
        const {id} = req.params;
        const {done} = req.body;
        const result = await pool.query('UPDATE tasks SET done = $1 WHERE id = $2 RETURNING *', [done, id]);

        if (result.rows.length === 0 ) {
            return res.status(404).json({error: 'Task not found'});
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
};

const deleteTasks = async (req,res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING * ', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found'});
        }
        res.json({ message: 'Task deleted', task: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}
module.exports = { getAllTasks, createTask, updateTasks, deleteTasks };
