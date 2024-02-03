#!/bin/bash

date=$(date '+%m%d%y-%H:%M:%S')
# echo $date
moveToFileName=insight-$date
echo $moveToFileName
sudo mv /var/www/planner /var/www/$moveToFileName && sudo mkdir /var/www/planner && sudo mv build/* /var/www/planner && sudo sudo service nginx restart


