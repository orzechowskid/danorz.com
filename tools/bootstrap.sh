#!/bin/bash

AWS_USER=awsuser
AWS_UID=$(id -u)
AWS_GID=$(id -g)

# create docker image
docker build -t danorz-aws \
       --build-arg UID=$AWS_UID \
       --build-arg GID=$AWS_GID \
       --build-arg USER=$AWS_USER \
       tools/aws
# use docker image to configure AWS creds
echo
echo Please configure your AWS credentials...

docker run --rm -itv $HOME/.aws:/home/$AWS_USER/.aws danorz-aws aws configure
