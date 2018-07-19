echo "***********************************"
echo "* ELYSIAN RESTORE                 *"
echo "***********************************"
echo ""
echo "Restore database from $HOME"
echo ""
docker run --rm --net ixopds_default --link db:db -v /$HOME/backup:/backup mongo bash -c 'mongorestore /backup --host db:27017'

echo ""
echo "***********************************"
echo "* ELYSIAN RESTORE COMPLETE        *"
echo "***********************************"