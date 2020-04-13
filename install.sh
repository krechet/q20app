#!/bin/bash
docker build -t q20app .
docker create -it -p 8080:1339 --name q20app q20app
docker start q20app

