#!/bin/bash

DOCKER_IMAGE=danorz-gateway

cleanup () {
    docker container rm $DOCKER_IMAGE
    docker image rm $DOCKER_IMAGE
}

docker build -t $DOCKER_IMAGE \
       --build-arg UID=$(id -u) \
       --build-arg GID=$(id -g) \
       gateway
