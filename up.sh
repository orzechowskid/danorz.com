#!/bin/sh

# run `up -d` unless told otherwise
ARGS="${@:-up -d}"

# necessary for building some services; see docker-compose.yml
USERNAME=$USER USERID=$(id -u) docker-compose --env-file=.env.local $ARGS
