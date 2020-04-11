#!/bin/bash
#/etc/rc.d/init.d/BotManager
# BotManager
#
# SysVinit service setup 
#
# description: 
# NodeJS Express/React application that 
# interacts with discord bot API
SERVICE_NAME=BotManager
MAIN_DIR=/var/nodejs/discord-bot-manager
CONTROLLER_FILE=/usr/local/bin/BotManager.sh

export NODE_ENV=production
cd $MAIN_DIR


start() {
        /bin/bash $CONTROLLER_FILE start
        touch /var/lock/subsys/DiscordBot
        return 0
}

stop() {
        /bin/bash $CONTROLLER_FILE stop
        rm -f /var/lock/subsys/DiscordBot
        return 0
}

restart() {
        /bin/bash $CONTROLLER_FILE restart
        return 0
}

status() {
        /bin/bash $CONTROLLER_FILE status
        return 0
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    reload)
        restart
        ;;
    *)
        echo "Usage: $SERVICE_NAME {start|stop|status|reload|restart}"
 exit 1
        ;;
esac
exit $?