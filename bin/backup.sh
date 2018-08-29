#!/bin/bash
DIR=$(date "+%Y.%m.%d-%H:%M:%S")
echo "***********************************"
echo "* ELYSIAN BACKUP                  *"
echo "***********************************"
echo ""
echo "Backup database to backup/$DIR"
echo ""
docker-compose exec db mongodump --out /backup/$DIR --host db:27017
echo ""
echo "***********************************"
echo "* ELYSIAN BACKUP COMPLETE         *"
echo "***********************************"