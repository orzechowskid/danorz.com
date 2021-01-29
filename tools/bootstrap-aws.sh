#!/bin/bash

DOCKER_IMAGE=danorz-aws
DOCKER_AWS_USER=awsuser

cleanup () {
    docker image rm -f $DOCKER_IMAGE
}

docker build -t $DOCKER_IMAGE \
       --build-arg UID=$(id -u)\
       --build-arg GID=$(id -g) \
       --build-arg USER=$DOCKER_AWS_USER \
       aws

# use docker image to configure AWS creds
echo
echo Please configure your AWS credentials...

docker run --rm -itv $HOME/.aws:/home/$DOCKER_AWS_USER/.aws $DOCKER_IMAGE aws configure
