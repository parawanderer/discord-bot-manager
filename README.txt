//////////////////////////////////////////////////////
                   Deployment Steps
//////////////////////////////////////////////////////

!! EXPECTING NODEJS TO BE INSTALLED ALREADY !! 


1) Set up .env file on production server 
(see .env.example for example file)

2) Set production environment variable

        $ export NODE_ENV=production

3) run build

        $ npm run prod-build

4) run serve (one way or another)

        $ node index.js



//////////////////////////////////////////////////////
        Alternatively, to run as service
//////////////////////////////////////////////////////

!! EXPECTING NODEJS TO BE INSTALLED ALREADY !! 


1) Set up .env file

2) Move shell/BotManager.sh to /usr/local/bin/BotManager.sh

        $ mv shell/BotManager.sh /usr/local/bin/BotManager.sh

3) Move shell/BotManagerService.sh to /etc/rc.d/init.d/BotManager

        $ mv shell/BotManagerService.sh /etc/rc.d/init.d/BotManager

4) Build application first:

        $ npm run prod-build

5) Run as service:

        TODO