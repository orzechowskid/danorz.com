#!/bin/bash

DOCKER_IMAGE=danorz-localdb
PORT=27017
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DB_DIR=$SCRIPT_DIR/localdb/.storage

docker run -d -v $SCRIPT_DIR/localdb/.storage:/data/db -e PORT=$PORT --net=host $DOCKER_IMAGE
