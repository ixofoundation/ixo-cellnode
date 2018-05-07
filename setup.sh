#!/bin/bash
#git clone https://github.com/ixofoundation/ixo-pds.git
#cd ixo-pds
echo "***********************************"
echo "* PROJECT DATA STORE SETUP        *"
echo "***********************************"
echo ""
echo "Build the Project Data Store(PDS)" 
docker build -t trustlab/ixo-pds .
echo "Build the PDS command line interface"
#docker build -t trustlab/pds-cli ../pds-cli
docker-compose up --no-start
docker-compose start db
docker-compose start mq
docker-compose start cache
sleep 7
docker-compose start app
#docker-compose exec cli /bin/sh -c "/usr/src/cli/bin/run" 
echo "Creating PDS ..."
sleep 5
#docker-compose exec app /bin/sh -c "chmod 777 /usr/src/app/bin/initialise-db.sh;/usr/src/app/bin/initialise-db.sh"
echo
echo "Creating PDS ...done"
docker-compose logs --tail 20 app
echo ""
echo "***********************************"
echo "* STORE YOUR SEED IN A SAFE PLACE *"
echo "***********************************"