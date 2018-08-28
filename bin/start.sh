#!/bin/bash

#green=`tput setaf 2`
echo "***********************************"
echo "* ELYSIAN START                   *"
echo "***********************************"
echo ""
CURRENT_DIR=`dirname $0`
ROOT_DIR=$CURRENT_DIR/..

# if the environment cannot provide the type try to get it from the script argument
if [ -z "$TARGET_ENVIRONMENT" ];
then
  TARGET_ENVIRONMENT=$1
fi

if [ -z "$TARGET_ENVIRONMENT" ];
then
    echo 'UNKNOWN TARGET ENVIRONMENT (dev, qa, uat or prod)'
    exit
fi

echo "Pulling $TARGET_ENVIRONMENT images"
docker-compose -f "$ROOT_DIR/docker-compose.yml" -f "$ROOT_DIR/docker-compose.$TARGET_ENVIRONMENT.yml" up --no-start

# docker-compose create
docker-compose start db
docker-compose start mq
docker-compose start cache

# attempting to wait for mongodb to be ready
$ROOT_DIR/bin/wait-for-service.sh db 'waiting for connections on port' 10
# attempting to wait for rabbitmq to be ready
$ROOT_DIR/bin/wait-for-service.sh mq 'Server startup complete;' 10
docker-compose start pol

docker-compose -f "$ROOT_DIR/docker-compose.yml" -f "$ROOT_DIR/docker-compose.$TARGET_ENVIRONMENT.yml" start app


echo -n "Starting Elysian ..."
sleep 5
echo ${green} "done"
docker-compose logs --tail 13 app
echo ""
echo "***********************************"
echo "* ELYSIAN START COMPLETE          *"
echo "***********************************"
docker-compose ps
# branch: master