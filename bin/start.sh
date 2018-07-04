#!/bin/bash
#git clone https://github.com/ixofoundation/ixo-pds.git
#cd ixo-pds
#green=`tput setaf 2`
echo "***********************************"
echo "* ELYSIAN START                   *"
echo "***********************************"
echo ""
echo "Build Elysian"
tsc 
docker build -t trustlab/ixo-elysian ../.

docker-compose up --no-start
# docker-compose create
docker-compose start db
docker-compose start mq
docker-compose start cache

./bin/wait-for-mongo.sh 27017
docker-compose start app
./bin/wait-for-rabbit.sh 
docker-compose start pol

echo -n "Starting Elysian ..."
sleep 5
echo ${green} "done"
docker-compose logs --tail 13 app
echo ""
echo "***********************************"
echo "* ELYSIAN START COMPLETE          *"
echo "***********************************"