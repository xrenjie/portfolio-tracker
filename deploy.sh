#!/bin/bash

echo 'Starting to Deploy...'

# Install required dependencies
sudo yum update
sudo yum upgrade
yes | sudo yum install -y java-19-amazon-corretto-devel
yes | sudo yum install nginx
yes | sudo yum install apt-transport-https ca-certificates curl software-properties-common
yes | sudo yum search docker
yes | sudo yum install docker

# make sure demo docker is not running
sudo docker rm $(sudo docker stop $(sudo docker ps -a -q --filter ancestor=demo:latest --format="{{.ID}}"))
sudo systemctl start docker
# copy nginx conf to default
sudo cp nginx.conf /etc/nginx/conf.d/default.conf

sudo systemctl restart nginx

# build dockerfile
sudo docker build -f backend/Dockerfile -t demo:latest ./backend

# run in detached mode
sudo docker run --env-file ../.finance_env -p 8080:8080 -d demo:latest 

sleep 15

PORT=8080
printf "\n\nService is running on $PORT ...\n\n"


echo 'Deployment completed successfully'
