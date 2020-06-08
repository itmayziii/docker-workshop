---
title: "Docker Compose"
metaTitle: "Docker Compose"
metaDescription: "Managing multi-container applications with Docker Compose"
---

# What is Docker Compose
[Docker Compose](https://docs.docker.com/compose/) is another tool available in the docker toolchain that specializes in managing multi-container
Docker applications. Think of an Application that has a web server that talks to a database container, and a caching
container like Redis.

## What I generally use Compose For
Docker Compose is a great tool for running multiple containers but in practice I generally only use it for local development.
This is mostly because in elevated environments I use some sort of container orchestration tool like Kubernetes. Another
reason why Compose is generally only useful locally is because sometimes your services are not containers at all but instead
managed services like SQL managed by GCP or AWS. You don't want to spend the money for these services on your local environment
, so you spin up your own "close enough" container to have MySQL or PostgreSQL.

## Compose File Structure

**THIS YAML IS FOR DEMONSTRATION ONLY, it will not actually run for you without the code as well.** This example is really
just to demonstrate what a docker-compose.yaml file generally looks like.
```yaml
version: "3.5"
services:
  scms_api:
    container_name: scms_api_dcom
    image: node:10
    networks:
      - scms
    ports:
      - "4000:4000"
    environment:
      - SCMS_GITHUB_GATSBY_REPO=dumpsters-com
    depends_on:
      - mysql
      - redis
      - mongo
    volumes:
      - ./:/home/node/app
    command: "npm run start"
    working_dir: "/home/node/app"

  mongo:
    container_name: scms_api_mongo
    image: mongo:3.6
    networks:
      - scms
    ports:
      - "27017:27017"
    volumes:
      - ./data/mongo:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password # Don't worry about passwords here, this is for localhost only. Production will not be using these.

  redis:
    container_name: scms_api_redis
    image: redis:3.0
    networks:
      - scms
    ports:
      - "6379:6379"

  mysql:
    container_name: scms_api_db
    image: mysql:5
    networks:
      - scms
    ports:
      - "8081:3306"
    volumes:
      - ./data/sql:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=password # Don't worry about passwords here, this is for localhost only. Production will not be using these.
      - MYSQL_USER=dev
      - MYSQL_PASSWORD=password
      - MYSQL_DATABASE=bdso

networks:
  scms:
    name: scms
```

With the config above all I have to do is run `docker-compose up` from inside my project, and it will start my 4 services.
This is a huge time saving boost as I don't have to run the `docker run` commands for each one of these containers.

## Managing With Docker Compose
Docker Compose also makes managing all of your services very easy.

### Stopping All Containers
```bash
docker-compose stop
```

### Destroying All Containers
```bash
docker-compose down
```

### Restarting All Containers
```bash
docker-compose restart
```

### Viewing All Container Logs
```bash
docker-compose logs -f
```
