#!/bin/bash
#git clone https://github.com/ixofoundation/ixo-pds.git
#cd ixo-pds
docker build -t trustlab/ixo-pds .
docker-compose up --no-start
docker-compose start
docker-compose exec cli /bin/sh -c "/usr/src/cli/bin/run" 
echo "Creating initial database ..." 
sleep 2
docker-compose exec app /bin/sh -c "chmod 777 /usr/src/app/bin/initialise-db.sh;/usr/src/app/bin/initialise-db.sh"
echo
echo "Creating initial database ...done"