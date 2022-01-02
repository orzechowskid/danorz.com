#!/bin/bash

DOCKER_IMAGE=dockersite_db_bootstrap
DOCKER_LOCALDB_USER=mongouser
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DB_DIR=$SCRIPT_DIR/localdb/.storage
DB_ROOT_USER=mongoadmin
DB_ROOT_PASS=secret
DB_USER=localdbuser
DB_PASS=keyboardcat123
DB_DATABASE=alewife-cms

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
CONTAINER_ID=`docker run -d --net=host -v $DB_DIR:/data/db -e MONGO_INITDB_ROOT_USERNAME=$DB_ROOT_USER -e MONGO_INITDB_ROOT_PASSWORD=$DB_ROOT_PASS $DOCKER_IMAGE`
sleep 3

# seed db with a user and some sample data
# TODO: this should really use /docker-entrypoint-initdb.d
cp -r $SCRIPT_DIR/localdb/data/dump $DB_DIR/dump
docker exec -it $CONTAINER_ID mongo -u $DB_ROOT_USER -p $DB_ROOT_PASS --eval "db.getSiblingDB(\"$DB_DATABASE\").createUser({ user: \"$DB_USER\", pwd: \"$DB_PASS\", roles:['dbOwner']})"
docker exec -it $CONTAINER_ID mongorestore -h 127.0.0.1 -p 27017 -u $DB_USER -p $DB_PASS -d $DB_DATABASE /data/db/dump/$DB_DATABASE
rm -rf $DB_DIR/dump

docker stop $CONTAINER_ID
docker image rm -f $DOCKER_IMAGE:latest
