#!/bin/sh
ssh ssh root@18.191.40.166 <<EOF
    cd ~/node-app
    git pull origin master
    curl -o-   https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh    | bash
    . ~/.nvm/nvm.sh
    npm install -g nodemon pm2
    pm2 restart ecosystem.config.js
    exit
EOF