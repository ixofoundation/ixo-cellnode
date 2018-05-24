#!/bin/bash
#git clone https://github.com/ixofoundation/ixo-pds.git
#cd ixo-pds
green=`tput setaf 2`
echo "***********************************"
echo "* ELYSIAN SETUP                   *"
echo "***********************************"
echo ""
echo "Build Elysian"
tsc 
docker build -t trustlab/ixo-elysian .
#echo "Build Elysian command line interface"
#docker build -t trustlab/elysian-cli ../pds-cli
docker-compose up --no-start
docker-compose start db
docker-compose start mq
docker-compose start cache
sleep 7
docker-compose start pol
docker-compose start app
#docker-compose exec cli /bin/sh -c "/usr/src/cli/bin/run" 
echo -n "Starting Elysian ..."
sleep 5
echo ${green} "done"
docker-compose logs --tail 20 app
echo ""
echo "***********************************"
echo "* ELYSIAN SETUP COMPLETE          *"
echo "***********************************"