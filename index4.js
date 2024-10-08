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

app.get('/', (req, res) => { // GET all tasks
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

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
