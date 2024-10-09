
# 🐳 Docker Cheat Sheet

## Основные команды Docker

### Управление контейнерами

- **Запустить контейнер:**
  ```bash
  docker run -d --name my-container my-image
  ```
  `-d` запускает контейнер в фоновом режиме, `--name` задает имя контейнера.

- **Остановить контейнер:**
  ```bash
  docker stop my-container
  ```

- **Удалить контейнер:**
  ```bash
  docker rm my-container
  ```

- **Посмотреть список запущенных контейнеров:**
  ```bash
  docker ps
  ```

- **Посмотреть список всех контейнеров (включая остановленные):**
  ```bash
  docker ps -a
  ```

### Управление Docker-образами

- **Загрузить образ:**
  ```bash
  docker pull my-image
  ```

- **Построить образ из Dockerfile:**
  ```bash
  docker build -t my-image .
  ```
  `-t` используется для задания имени образа.

- **Удалить образ:**
  ```bash
  docker rmi my-image
  ```

- **Посмотреть список всех образов:**
  ```bash
  docker images
  ```

### Запуск контейнера с параметрами

- **Запустить контейнер с портами и переменными среды:**
  ```bash
  docker run -d -p 8080:80 -e ENV_VAR=value --name my-container my-image
  ```
  `-p` связывает порты, а `-e` задает переменные окружения.

## 🛠 Управление контейнерами

- **Перейти в контейнер с помощью терминала:**
  ```bash
  docker exec -it my-container bash
  ```
  `-it` означает интерактивный режим, `bash` открывает оболочку.

- **Просмотреть логи контейнера:**
  ```bash
  docker logs my-container
  ```

- **Перезапустить контейнер:**
  ```bash
  docker restart my-container
  ```

## 📦 Docker Compose

### Основные команды Docker Compose

- **Запустить все сервисы из docker-compose.yml:**
  ```bash
  docker-compose up
  ```

- **Запустить все сервисы в фоновом режиме:**
  ```bash
  docker-compose up -d
  ```

- **Остановить все запущенные сервисы:**
  ```bash
  docker-compose down
  ```

- **Пересобрать и запустить сервисы:**
  ```bash
  docker-compose up --build
  ```

### Пример файла docker-compose.yml

```yaml
version: '3.8'
services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"

  web:
    image: node
    working_dir: /app
    volumes:
      - .:/app
    ports:
      - "3000:3000"
    command: npm start
    depends_on:
      - db
```

## 🔍 Полезные команды для управления

- **Посмотреть состояние всех контейнеров и сервисов:**
  ```bash
  docker-compose ps
  ```

- **Остановить конкретный сервис:**
  ```bash
  docker-compose stop my-service
  ```

- **Удалить все контейнеры, сети и тома, созданные Docker Compose:**
  ```bash
  docker-compose down -v
  ```

## 🛠 Управление томами и сетями

- **Посмотреть список томов Docker:**
  ```bash
  docker volume ls
  ```

- **Удалить том Docker:**
  ```bash
  docker volume rm my-volume
  ```

- **Посмотреть список сетей Docker:**
  ```bash
  docker network ls
  ```

- **Удалить сеть Docker:**
  ```bash
  docker network rm my-network
  ```
```