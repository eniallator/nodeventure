#!/bin/bash
node server.js &

for (( ; ; ))
do
    git pull
    sleep 5
done
