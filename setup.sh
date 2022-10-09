#!/bin/bash

function clientSetup(){
    clear
    cd client 
    echo "$(tput setaf 2)Installing Client Dependencies"
    npm install &> /dev/null
    echo "$(tput setaf 2)Building Client"
    npm run build &> /dev/null
    cd ..
}

function serverSetup(){
    cd server
    echo "$(tput setaf 2)Installing Server Dependencies"
    npm install &> /dev/null
    cd ..
}

function startServer(){
    echo "$(tput setaf 7) $(tput setab 0)"
    cd server
    npm start
}

function main(){
NODE=`type -P node`
NPM=`type -P npm`

if test -z "$NODE"
then
    echo "Installing Node"
    sudo apt install nodejs -y &> /dev/null
    return 0;
fi

if test -z "$NPM" 
then
    echo "Installing NPM"
    sudo apt install npm -y &> /dev/null
    return 0;
fi

clientSetup
serverSetup

echo "Start Server ? y/n"
read CHOICE

if [ $CHOICE == 'y' ] || [ $CHOICE == 'Y' ];
then
startServer
fi

}

main

