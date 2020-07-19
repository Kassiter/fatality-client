#!/usr/bin/bash

if [ "$NODE_ENV" == "production" ];
then
echo "node server.js"
else
echo "npm run start"
fi