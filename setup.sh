#!/bin/bash
docker build -t trustlab/ixo-pds .
docker-compose create
docker-compose start
echo "Enter external URI database location"
read uri
echo "Creating initial database with external URI $uri ..." 
sleep 7
docker-compose exec app /bin/sh -c "chmod 777 /usr/src/app/bin/initialise-db.sh;/usr/src/app/bin/initialise-db.sh"
echo
echo "Creating initial database ...done"