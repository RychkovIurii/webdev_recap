**PostgreSQL**:

### 1. **Управление PostgreSQL-сервисом (для MacOS/Linux)**

- **Запуск сервиса PostgreSQL**:
   Если PostgreSQL был установлен через Homebrew (MacOS) или APT (Linux):
   ```bash
   brew services start postgresql  # MacOS
   sudo service postgresql start   # Linux
   ```

- **Остановка сервиса PostgreSQL**:
   ```bash
   brew services stop postgresql   # MacOS
   sudo service postgresql stop    # Linux
   ```

- **Перезапуск сервиса PostgreSQL**:
   ```bash
   brew services restart postgresql   # MacOS
   sudo service postgresql restart    # Linux
   ```

- **Проверка статуса PostgreSQL**:
   Чтобы убедиться, что PostgreSQL запущен:
   ```bash
   brew services list   # MacOS
   sudo service postgresql status   # Linux
   ```

### 2. **Работа с PostgreSQL через psql**

- **Подключение к PostgreSQL**:
   Для подключения к базе данных `postgres` по умолчанию (или к любой другой базе):
   ```bash
   psql postgres  # Подключиться к базе данных "postgres"
   psql -d testdb # Подключиться к базе данных "testdb"
   ```

- **Проверка списка баз данных**:
   После подключения к `psql` для получения списка всех баз данных:
   ```sql
   \l
   ```

- **Проверка списка таблиц в текущей базе данных**:
   Чтобы увидеть все таблицы в подключенной базе данных:
   ```sql
   \dt
   ```

- **Создание новой базы данных**:
   Если необходимо создать новую базу данных:
   ```sql
   CREATE DATABASE mydatabase;
   ```

- **Подключение к другой базе данных**:
   Чтобы переключиться на другую базу данных:
   ```sql
   \c mydatabase
   ```

### 3. **Основные SQL-команды для работы с таблицами и данными**

- **Создание таблицы**:
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       age INT
   );
   ```

- **Просмотр структуры таблицы**:
   Чтобы увидеть структуру таблицы (список полей и их типы данных):
   ```sql
   \d users
   ```

- **Вставка данных в таблицу**:
   ```sql
   INSERT INTO users (name, age) VALUES ('John Doe', 30);
   ```

- **Выборка данных из таблицы**:
   ```sql
   SELECT * FROM users;
   ```

- **Обновление данных в таблице**:
   ```sql
   UPDATE users SET age = 31 WHERE name = 'John Doe';
   ```

- **Удаление данных из таблицы**:
   ```sql
   DELETE FROM users WHERE name = 'John Doe';
   ```

### 4. **Выход и другие полезные команды**

- **Выход из psql**:
   Для выхода из psql:
   ```bash
   \q
   ```

- **Очистка экрана в psql**:
   Чтобы очистить экран внутри psql:
   ```bash
   \! clear
   ```

Вот шпаргалка по командам для работы с PostgreSQL. Она охватывает основные команды для управления базами данных, пользователями, таблицами и работой с данными.

---

### 🛠 **Управление сервисом PostgreSQL**
- **Запустить PostgreSQL:**
  ```bash
  brew services start postgresql@15
  ```
- **Остановить PostgreSQL:**
  ```bash
  brew services stop postgresql@15
  ```
- **Перезапустить PostgreSQL:**
  ```bash
  brew services restart postgresql@15
  ```

### 🔗 **Подключение к PostgreSQL**
- **Подключиться к серверу PostgreSQL:**
  ```bash
  psql -U postgres
  ```
- **Подключиться к конкретной базе данных:**
  ```bash
  psql -U postgres -d mydatabase
  ```

### 📋 **Основные команды PostgreSQL**
- **Просмотреть список баз данных:**
  ```sql
  \l
  ```
- **Переключиться на другую базу данных:**
  ```sql
  \c mydatabase
  ```
- **Просмотреть список таблиц:**
  ```sql
  \dt
  ```
- **Просмотреть структуру таблицы:**
  ```sql
  \d users
  ```
- **Выйти из PostgreSQL:**
  ```sql
  \q
  ```

### 👤 **Управление пользователями и ролями**
- **Создать нового пользователя:**
  ```sql
  CREATE USER myuser WITH PASSWORD 'mypassword';
  ```
- **Назначить права суперпользователя:**
  ```sql
  ALTER USER myuser WITH SUPERUSER;
  ```
- **Удалить пользователя:**
  ```sql
  DROP USER myuser;
  ```
- **Просмотреть список пользователей:**
  ```sql
  \du
  ```

### 📂 **Управление базами данных**
- **Создать новую базу данных:**
  ```sql
  CREATE DATABASE mydatabase;
  ```
- **Удалить базу данных:**
  ```sql
  DROP DATABASE mydatabase;
  ```
- **Изменить владельца базы данных:**
  ```sql
  ALTER DATABASE mydatabase OWNER TO myuser;
  ```

### 📊 **Работа с таблицами**
- **Создать таблицу:**
  ```sql
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      age INT
  );
  ```
- **Вставить данные в таблицу:**
  ```sql
  INSERT INTO users (name, age) VALUES ('John Doe', 30);
  ```
- **Обновить данные в таблице:**
  ```sql
  UPDATE users SET age = 31 WHERE name = 'John Doe';
  ```
- **Удалить данные из таблицы:**
  ```sql
  DELETE FROM users WHERE name = 'John Doe';
  ```
- **Удалить таблицу:**
  ```sql
  DROP TABLE users;
  ```

### 🔍 **Работа с данными**
- **Получить все данные из таблицы:**
  ```sql
  SELECT * FROM users;
  ```
- **Выбрать данные с условием:**
  ```sql
  SELECT * FROM users WHERE age > 25;
  ```
- **Отсортировать данные:**
  ```sql
  SELECT * FROM users ORDER BY age DESC;
  ```
- **Посчитать количество записей:**
  ```sql
  SELECT COUNT(*) FROM users;
  ```

### 🛡 **Резервное копирование и восстановление**
- **Создать резервную копию базы данных:**
  ```bash
  pg_dump mydatabase > mydatabase_backup.sql
  ```
- **Восстановить базу данных из резервной копии:**
  ```bash
  psql mydatabase < mydatabase_backup.sql
  ```

---
