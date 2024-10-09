Cоздадим небольшой сервер на **Node.js с Express.js**, настроим базу данных **PostgreSQL** и запустим все это в **Docker**.

### Шаг 1: Настройка проекта Node.js и Express.js

1. **Создай новую папку для проекта** и перейди в нее:
   ```bash
   mkdir express-crud-app
   cd express-crud-app
   ```

2. **Инициализируй проект**:
   ```bash
   npm init -y
   ```

3. **Установи необходимые пакеты**:
   - **Express** для создания сервера.
   - **pg** — библиотека для работы с PostgreSQL в Node.js.
   ```bash
   npm install express pg
   ```

4. **Создай файл `index.js`** с базовой настройкой сервера:
   ```js
   const express = require('express');
   const { Pool } = require('pg');
   const app = express();
   const port = 3000;

   // Подключение к базе данных PostgreSQL
   const pool = new Pool({
       user: 'postgres', // Имя пользователя PostgreSQL
       host: 'localhost',
       database: 'testdb',
       password: 'mysecretpassword', // Задай свой пароль
       port: 5432,
   });

   app.use(express.json()); // Для работы с JSON

   // Пример GET запроса
   app.get('/', (req, res) => {
       res.send('Hello World!');
   });

   // Старт сервера
   app.listen(port, () => {
       console.log(`Server is running on http://localhost:${port}`);
   });
   ```

5. **Запуск сервера**:
   Запусти сервер командой:
   ```bash
   node index.js
   ```
   Открой браузер и перейди на `http://localhost:3000`, чтобы увидеть "Hello World!"

---

### Шаг 2: Реализуем CRUD-операции

Добавим CRUD-операции для взаимодействия с PostgreSQL.

1. **Создай таблицу в PostgreSQL** (переходим к шагу работы с PostgreSQL):
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       age INT
   );
   ```

2. **Добавим CRUD в `index.js`**:

   **Создание пользователя (POST)**:
   ```js
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
   ```

   **Получение всех пользователей (GET)**:
   ```js
   app.get('/users', async (req, res) => {
       try {
           const users = await pool.query('SELECT * FROM users');
           res.json(users.rows);
       } catch (err) {
           console.error(err.message);
           res.status(500).send('Server error');
       }
   });
   ```

   **Получение одного пользователя (GET)**:
   ```js
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
   ```

   **Обновление пользователя (PUT)**:
   ```js
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
   ```

   **Удаление пользователя (DELETE)**:
   ```js
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
   ```

---

### Шаг 3: Работа с PostgreSQL

1. **Запусти PostgreSQL**:
   Если у тебя установлен PostgreSQL, запусти его:
   ```bash
   brew services start postgresql
   ```

2. **Подключись к PostgreSQL**:
   ```bash
   psql postgres
   ```

3. **Создай базу данных**:
   ```sql
   CREATE DATABASE testdb;
   ```

4. **Создай таблицу пользователей**:
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       age INT
   );
   ```

---

### Шаг 4: Работа с Docker

1. **Создай файл `Dockerfile`** для создания контейнера с приложением:
   ```Dockerfile
   FROM node:14
   WORKDIR /app
   COPY package.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["node", "index.js"]
   ```

2. **Создай файл `docker-compose.yml`** для запуска базы данных и сервера:
   ```yaml
   version: '3'
   services:
     db:
       image: postgres
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: mysecretpassword
         POSTGRES_DB: testdb
       ports:
         - "5432:5432"
     web:
       build: .
       ports:
         - "3000:3000"
       depends_on:
         - db
   ```

3. **Запусти Docker**:
   ```bash
   docker-compose up
   ```

Это запустит и базу данных, и сервер в Docker-контейнерах.

---

### Проверка работы

- **Создай пользователя**:
  Отправь POST-запрос с телом JSON:
  ```json
  {
      "name": "John Doe",
      "age": 30
  }
  ```
  на `http://localhost:3000/users`.

- **Получение всех пользователей**:
  Открой `http://localhost:3000/users`.
