#!/bin/bash

RETRY_LIMIT=7

PORT="$1"
MATCH=$(docker logs db | grep "waiting for connections on port $PORT")
MATCH_LENGTH=${#MATCH}

COUNTER=0
while [[ $MATCH_LENGTH -eq 0 && $COUNTER -lt $RETRY_LIMIT ]] ; do
    ((COUNTER++))
    sleep 1

    echo "waiting for mongo, retry: $COUNTER"
    MATCH=$(docker logs db | grep "waiting for connections on port $PORT")
    MATCH_LENGTH=${#MATCH}    
done

echo "$MATCH"