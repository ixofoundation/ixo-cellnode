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

# prepare parameters from the AWS Parameter Store
password=`aws ssm get-parameter --name "DB_PASSWORD" --with-decryption --query Parameter.Value`
export DB_PASSWORD="${password//\"}"
export MQ_PASSWORD="${password//\"}"
export ROOTPASS="${password//\"}"
userdb=`aws ssm get-parameter --name "DB_USER" --with-decryption --query Parameter.Value`
export DB_USER="${userdb//\"}"
usermq=`aws ssm get-parameter --name "MQ_USER" --with-decryption --query Parameter.Value`
export MQ_USER="${usermq//\"}"
cipher=`aws ssm get-parameter --name "ASYMCYPHER" --with-decryption --query Parameter.Value`
export ASYMCYPHER="${cipher//\"}"
cipherkey=`aws ssm get-parameter --name "ASYMKEY" --with-decryption --query Parameter.Value`
export ASYMKEY="${cipherkey//\"}"
admin=`aws ssm get-parameter --name "ROOT" --with-decryption --query Parameter.Value`
export ROOT="${admin//\"}"

dbadmin="$ROOT_DIR/dbadmin"
echo "Check if ${dbadmin} dir present"
echo "Does ${dbadmin} exist? "
if [ -d "${dbadmin}" ]
then
  echo "YES"

  sed -i "s|%%ROOT%%|$ROOT|" "$dbadmin/create-admin-user.js"
  sed -i "s|%%PASSWORD%%|$DB_PASSWORD|" "$dbadmin/create-admin-user.js"
  sudo mv $dbadmin/create-admin-user.js $ROOT_DIR/db/

  sed -i "s|%%USER%%|$DB_USER|" "$dbadmin/create-elysian-user.js"
  sed -i "s|%%PASSWORD%%|$DB_PASSWORD|" "$dbadmin/create-elysian-user.js"
  sudo mv $dbadmin/create-elysian-user.js $ROOT_DIR/db/

  rm -rf ${dbadmin}
else
  echo "NO"
fi

echo "Pulling $TARGET_ENVIRONMENT images"
docker-compose -f "$ROOT_DIR/docker-compose.yml" -f "$ROOT_DIR/docker-compose.$TARGET_ENVIRONMENT.yml" up --no-start

# docker-compose create
docker-compose start db
docker-compose start mq
docker-compose start cache

# attempting to wait for mongodb to be ready
$ROOT_DIR/bin/wait-for-service.sh db 'waiting for connections on port' 10

if [ -f "$ROOT_DIR/db/create-admin-user.js" ]
then
  docker exec db mongo admin /data/db/create-admin-user.js
  docker exec db rm /data/db/create-admin-user.js
fi

if [ -f "$ROOT_DIR/db/create-elysian-user.js" ]
then
  docker exec db mongo elysian /data/db/create-elysian-user.js
  docker exec db rm /data/db/create-elysian-user.js
fi

# attempting to wait for rabbitmq to be ready
$ROOT_DIR/bin/wait-for-service.sh mq 'Server startup complete;' 10
docker-compose start pol
docker-compose start app
docker-compose start cli

echo -n "Starting Elysian ..."
sleep 5
echo ${green} "done"
docker-compose logs --tail 13 app
echo ""
echo "***********************************"
echo "* ELYSIAN START COMPLETE          *"
echo "***********************************"
docker-compose ps
# branch: dev