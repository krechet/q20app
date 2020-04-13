#!/bin/bash
docker build -t q20app .
docker create -it -p 8080:1339 --name q20app q20app
docker start q20app
RESULT=$?
if [ $RESULT -eq 0 ]; then
  echo The app is serving at http://localhost:8080
else
  echo Failed
fi


