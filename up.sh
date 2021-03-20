#!/bin/sh

# necessary for building some services; see docker-compose.yml
export USERNAME=$USER
export USERID=$(id -u)

docker-compose --env-file=.env.local up
