---
title: "Managing Docker Containers"
metaTitle: "Managing Docker Containers"
metaDescription: "Overview of commands to run/manage docker containers"
---

# Finding an Image to Run

## Registries
Images are stored in something called a [registry](https://docs.docker.com/registry/). Think of a registry as a place to
keep your images either privately, behind authentication, or for the public to use. The main Docker registry can be found
[here](https://hub.docker.com/) and this is where Docker commands will look by default when pulling an image.

Take our example from [quick examples](quick-examples) where we pull a Nginx image using:
```bash
docker run -dit -p 8080:80 --name my-nginx nginx:1.18.0
```
The last part of the command `nginx:1.18.0` is saying pull an image named `nginx` from the default docker hub registry,
and make sure to pull the image tagged 1.18.0. Tags are essentially a way to version your images. Docker tags come in many
common flavors, but it really is up to the author. A common convention is:
* `nginx:1.18.0` - Will give you a very specific version being `1.18.0`
* `nginx:1.18` - Will give you the latest `1.18.x` version whatever `x` happens to be. This is good for people that want
to stay up to date with patches.
* `nginx:latest` - Will give you the latest Nginx version. You should really avoid these tags for production, but they can
be helpful when you are just trying to test something locally, and you want the most up to date software.
* `nginx:1.18-alpine` - Will give you Nginx but on Alpine and not a Debian based image. Alpine is a popular distro with
containers because of how small it is.

## Official Images
You often want to look for [official Docker images](https://docs.docker.com/docker-hub/official_images/) which are a
curated set of Docker repositories hosted on Docker Hub. These official images are likely to be easy to use and have the
most up to date security patches.

# Creating/Running Containers
Let us extend the simple Nginx example we have used a few times now.
```bash
docker run -dit -p 8080:80 --name my-nginx nginx:1.18.0
```

What is the above command actually doing? Let us break it down:

```bash
-
+ docker run nginx:1.18.0
```
Start a docker container based on the `nginx:1.18.0` image.


```bash
- docker run nginx:1.18.0
+ docker run -dit nginx:1.18.0
```
`-dit`
- d = Run container in background and print container ID
- i = Keep STDIN open even if not attached. Without this you would not be able to interact with the terminal.
- t = Allocate a pseudo-TTY. Without this you would not see the containers terminal output.

```bash
- docker run -dit nginx:1.18.0
+ docker run -dit --name my-nginx nginx:1.18.0
```
`--name` names the docker container instead of the random name docker will give you.

```bash
- docker run -dit --name my-nginx nginx:1.18.0
+ docker run -dit --name -p 8080:80 my-nginx nginx:1.18.0
```
Attach port 8080 on the host machine to port 80 on the container. This is what makes `http://localhost:8080` work because
port 80 is what Nginx default listens to.

## Docker Run vs Create+Start
`docker run` is actually the combination of a few commands. You may have noticed by now that `docker run` is creating and
starting a docker container for us, but we can actually do these two things at separate times.

Create the container
```bash
docker create -it --name another-nginx nginx:1.18.0
```

Start the container
```bash
docker start another-nginx
```

# Managing Running Containers
## Stop a Container
```bash
docker stop CONTAINER_NAME
```

## List Running Containers
```bash
docker ps
```

### List All Containers (even stopped ones)
```bash
docker ps -a
```

### Run a Command in a Running Container
```bash
docker exec -it CONTAINER_NAME COMMAND
docker exec -it another-nginx bash
```

### Delete Containers
You must first stop a container before deleting it
```bash
docker stop CONTAINER_ID or CONTAINER_NAME
docker stop another-nginx
docker rm another-nginx
```

Alternatively you can force delete a running container
```bash
docker rm -f another-nginx
```

### See Container Logs
```bash
docker logs -f CONTAINER_NAME
docker logs -f another-nginx
```

### View Locally Downloaded Images
```bash
docker images
```

### Delete Local Images
```bash
docker rmi IMAGE_ID or NAME:TAG
docker rmi bitnami/laravel:7-debian-10
```
