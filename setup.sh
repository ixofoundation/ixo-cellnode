#!/bin/bash
echo "Enter external URI database location"
read uri
docker build -t trustlab/ixo-pds .
docker-compose up --no-start
docker-compose start
echo "Creating initial database with external URI $uri ..." 
sleep 7
docker-compose exec app /bin/sh -c "chmod 777 /usr/src/app/bin/initialise-db.sh;/usr/src/app/bin/initialise-db.sh"
echo
echo "Creating initial database ...done"