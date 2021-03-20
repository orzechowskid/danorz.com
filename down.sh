#!/bin/bash

export USERID=$(id -u)

docker-compose --env-file .env.local down
