#!/bin/bash
DIR=$1
if [ -z "$1" ]
  then
    echo "please supply directory where backup needs to be saved"
    exit 1
fi
echo "***********************************"
echo "* ELYSIAN BACKUP                  *"
echo "***********************************"
echo ""
echo "Backup database to $DIR/backup"
echo ""
docker run --rm --net ixopds_default --link db:db -v $DIR/backup:/backup mongo bash -c 'mongodump --out /backup --host db:27017'

echo ""
echo "***********************************"
echo "* ELYSIAN BACKUP COMPLETE         *"
echo "***********************************"