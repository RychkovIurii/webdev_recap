# Use the official PostgreSQL image from the Docker Hub
FROM postgres:latest

# Environment variables for the default database and user
ENV POSTGRES_DB=tododb
ENV POSTGRES_USER=youruser
ENV POSTGRES_PASSWORD=yourpassword

# Copy the initialization SQL script to the Docker image
COPY init.sql /docker-entrypoint-initdb.d/

# In folder testing we run: 
	### docker build -t my-postgres-db . ###
	### docker run --name irychkov-postgres-container -p 5432:5432 my-postgres-db ###
	### docker ps -a ###
	### docker start irychkov-postgres-container ###
	### docker exec -it irychkov-postgres-container psql -U youruser -d tododb ###
	### \dt ###
	### \l ###
	### \d todos ###