#!/bin/sh
# /usr/local/bin/BotManager.sh
# BotManager
#   
# Basic bash script controller setup
#
SERVICE_NAME=BotManager
MAIN_DIR=/var/nodejs/discord-bot-manager
PATH_TO_START_FILE=$MAIN_DIR/index.js
PID_PATH_NAME=/tmp/BotManager-pid

case $1 in
start)
       echo "Starting $SERVICE_NAME ..."
  if [ ! -f $PID_PATH_NAME ]; then
       nohup node $PATH_TO_START_FILE /tmp 2>> /dev/null >>/dev/null &
                   echo $! > $PID_PATH_NAME
       echo "$SERVICE_NAME started"
  else
       echo "$SERVICE_NAME is already running"
  fi
;;
stop)
  if [ -f $PID_PATH_NAME ]; then
         PID=$(cat $PID_PATH_NAME);
         echo "$SERVICE_NAME stoping ..."
         kill $PID;
         echo "$SERVICE_NAME stopped"
         rm $PID_PATH_NAME
  else
         echo "$SERVICE_NAME is not running"
  fi
;;
status) 
    if [ -f $PID_PATH_NAME ]; then
        PID=$(cat $PID_PATH_NAME);
        echo "$SERVICE_NAME (pid $PID) is running..."
    else
        echo "$SERVICE_NAME is stopped"
    fi
;;
restart)
   if [ -f $PID_PATH_NAME ]; then
      PID=$(cat $PID_PATH_NAME);
      echo "$SERVICE_NAME stopping ...";
      kill $PID;
      echo "$SERVICE_NAME stopped";
      rm $PID_PATH_NAME
      echo "$SERVICE_NAME starting ..."
      nohup node $PATH_TO_START_FILE /tmp 2>> /dev/null >> /dev/null &
      echo $! > $PID_PATH_NAME
      echo "$SERVICE_NAME started"
  else
      echo "$SERVICE_NAME is not running ..."
     fi     ;;
 esac