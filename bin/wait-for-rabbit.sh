#!/bin/bash

RETRY_LIMIT=20

MATCH=$(docker logs mq | grep "Server startup complete")
MATCH_LENGTH=${#MATCH}

COUNTER=0
while [[ $MATCH_LENGTH -eq 0 && $COUNTER -lt $RETRY_LIMIT ]] ; do
    ((COUNTER++))
    sleep 1

    echo "waiting for rabbit, retry: $COUNTER"
    MATCH=$(docker logs mq | grep "Server startup complete")
    MATCH_LENGTH=${#MATCH}    
done

echo "$MATCH"