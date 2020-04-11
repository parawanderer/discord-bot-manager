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
   & make sure it is executable

        $ mv shell/BotManager.sh /usr/local/bin/BotManager.sh
        $ chmod +x /usr/local/bin/BotManager.sh

3) Move shell/BotManagerService.sh to /etc/init.d/BotManager
   & make sure it is executable
   & enable the daemon

        $ mv shell/BotManagerService.sh /etc/init.d/BotManager
        $ chmod +x /etc/init.d/BotManager
        $ update-rc.d BotManager defaults

4) Build application first:

        $ npm run prod-build

5) Run as service:

        $ service BotManager start