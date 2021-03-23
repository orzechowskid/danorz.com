#!/bin/bash

DOCKER_IMAGE=dockersite_db_1
DOCKER_LOCALDB_USER=mongouser
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DB_DIR=$SCRIPT_DIR/localdb/.storage
DB_ROOT_USER=mongoadmin
DB_ROOT_PASS=secret
DB_USER=localdbuser
DB_PASS=keyboardcat123

cleanup () {
    docker container rm $DOCKER_IMAGE
    docker image rm $DOCKER_IMAGE
    rm -rf $DB_DIR
}

docker build -t $DOCKER_IMAGE \
       --build-arg UID=$(id -u)\
       --build-arg GID=$(id -g) \
       --build-arg USER=$DOCKER_LOCALDB_USER \
       localdb

rm -rf $DB_DIR
mkdir -p $DB_DIR

# initialize db with known creds
CONTAINER_ID=`docker run -itd --rm --net=host -v $DB_DIR:/data/db -e MONGO_INITDB_ROOT_USERNAME=$DB_ROOT_USER -e MONGO_INITDB_ROOT_PASSWORD=$DB_ROOT_PASS $DOCKER_IMAGE`
sleep 3

# seed db with some sample data
# TODO

# TODO: this should really use /docker-entrypoint-initdb.d
docker exec -it $DOCKER_IMAGE mongo --eval "db.getSiblingDB('alewife-cms').createUser({ user: \"$DB_USER\", pwd: \"$DB_PASS\", roles:['dbOwner']})"
docker stop $CONTAINER_ID

