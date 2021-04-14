#!/bin/sh

# necessary for building some services; see docker-compose.yml
USERNAME=$USER USERID=$(id -u) docker-compose --env-file=.env.local up $@
