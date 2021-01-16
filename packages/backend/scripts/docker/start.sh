#!/bin/bash

source .env

docker run -e PORT=$PORT --net=host danorz-backend
