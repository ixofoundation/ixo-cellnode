#!/bin/bash
DIR=$1
if [ -z "$1" ]
  then
    echo "please supply directory where backup resides"
    exit 1
fi
echo "***********************************"
echo "* ELYSIAN RESTORE                 *"
echo "***********************************"
echo ""
echo "Restore database from backup/$DIR"
echo ""
docker-compose exec db mongorestore /backup/$DIR --host db:27017
echo ""
echo "***********************************"
echo "* ELYSIAN RESTORE COMPLETE        *"
echo "***********************************"