const express = require('express');
/* const { Pool } = require('pg'); */
const pool = require('./dbConfig');
const app = express();
const port = 3000;

/* // Подключение к базе данных PostgreSQL
const pool = new Pool({
    user: 'postgres', // Имя пользователя PostgreSQL
    host: 'localhost',
    database: 'postgres',
    password: 'password', // Задай свой пароль
    port: 5432,
}); */

app.use(express.json()); // Для работы с JSON

// Пример GET запроса
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoint to check the database connection
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

// Создание пользователя (POST)
app.post('/users', async (req, res) => {
    const { name, age } = req.body;
    try {
        const newUser = await pool.query(
            'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
            [name, age]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Получение всех пользователей (GET)
app.get('/users', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Получение пользователя по ID (GET)
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Обновление пользователя (PUT)
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    try {
        const updatedUser = await pool.query(
            'UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *',
            [name, age, id]
        );
        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Удаление пользователя (DELETE)
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.send('User deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




// Старт сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
