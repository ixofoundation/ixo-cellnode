#!/bin/bash
green=`tput setaf 2`
echo "***********************************"
echo "* ELYSIAN START                   *"
echo "***********************************"
echo ""

docker-compose create
docker-compose start db
docker-compose start mq
docker-compose start cache

sleep 10
docker-compose start pol
docker-compose start app

echo -n "Starting Elysian ..."
sleep 5
echo ${green} "done"
docker-compose logs --tail 13 app
echo ""
echo "***********************************"
echo "* ELYSIAN START COMPLETE          *"
echo "***********************************"