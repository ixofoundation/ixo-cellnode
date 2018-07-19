echo "***********************************"
echo "* ELYSIAN BACKUP                  *"
echo "***********************************"
echo ""
echo "Backup database to $HOME"
echo ""

docker run --rm --net ixopds_default --link db:db -v /$HOME/backup:/backup mongo bash -c 'mongodump --out /backup --host db:27017'

echo ""
echo "***********************************"
echo "* ELYSIAN BACKUP COMPLETE         *"
echo "***********************************"