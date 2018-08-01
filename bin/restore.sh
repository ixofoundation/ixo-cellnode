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
echo "Restore database from $DIR/backup"
echo ""
docker run --rm --net ixopds_default --link db:db -v $DIR/backup:/backup mongo bash -c 'mongorestore /backup --host db:27017'

echo ""
echo "***********************************"
echo "* ELYSIAN RESTORE COMPLETE        *"
echo "***********************************"