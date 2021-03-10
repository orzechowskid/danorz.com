#!/bin/bash

DOCKER_IMAGE=danorz-gateway
PORT=8080

docker run -d -e PORT=$PORT --net=host $DOCKER_IMAGE
