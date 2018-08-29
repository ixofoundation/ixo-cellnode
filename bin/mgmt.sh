#!/bin/bash

docker-compose run cli

CURRENT_DIR=`dirname $0`
ROOT_DIR=$CURRENT_DIR/..

if [ "$1" = "dev" ]
then
  echo "Running with Development config"
  if [[ ! -f $ROOT_DIR/docker-compose.dev.yml  ]] ; then
      echo 'It appears as if you are trying to run in local development mode without a docker-compose.dev.yml. Make a copy of docker-compose.uat.yml, rename it and adapt it as neccesary. BUT NEVER CHECK IT IN!'
      exit
  fi

  docker-compose -f $ROOT_DIR/docker-compose.yml -f $ROOT_DIR/docker-compose.dev.yml run cli
elif [ "$1" = "uat" ]; then
  echo "Running with UAT config"

  docker-compose -f $ROOT_DIR/docker-compose.yml -f $ROOT_DIR/docker-compose.uat.yml run cli
else
  echo "Running with Production config"
  docker-compose -f $ROOT_DIR/docker-compose.yml -f $ROOT_DIR/docker-compose.prod.yml run cli
fi