const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3004;

app.use(express.json());

const pool = new Pool({
    user: 'youruser',
    host: 'localhost',
    database: 'tododb',
    password: 'yourpassword',
    port: 5432,
});

app.get('/', (req, res) => { // GET Hi there!
	try {
		res.send("Hi there!");
	}
	catch(err)
	{
		console.log(err);
	}
});

app.get('/db-check', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'Connected',
            currentTime: result.rows[0].now,
        });
    } catch (err) {
        console.error('Database connection error:', err.message);
        res.status(500).json({
            status: 'Error',
            message: 'Could not connect to the database',
            error: err.message,
        });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM todos ORDER BY title');
        res.json(tasks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = await pool.query(
            'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        res.json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedTask = await pool.query(
            'UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, id]
        );
        res.json(updatedTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.delete('/tasks/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query('DELETE FROM todos WHERE id = $1', [id]);
		res.json({ message: 'Task deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
