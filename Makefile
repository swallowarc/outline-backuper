# basic parameters
NAME     := outline-backuper
VERSION  := v0.0.0
REVISION := $(shell git rev-parse --short HEAD)

# build parameters
DOCKER_CMD = docker
DOCKER_COMPOSE_CMD = docker-compose
DOCKER_BUILD = $(DOCKER_CMD) build
DOCKER_PUSH = $(DOCKER_CMD) push
DOCKER_REGISTRY = swallowarc/outline-backuper
DOCKER_USER ?= fake_user
DOCKER_PASS ?= fake_pass

.PHONY: build docker/build docker/push
build:
	npm install
docker/build:
	$(DOCKER_BUILD) -t $(DOCKER_REGISTRY) .
docker/push:
	$(DOCKER_PUSH) $(DOCKER_REGISTRY)
