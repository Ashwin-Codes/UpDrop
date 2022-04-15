#!/bin/bash

function clientSetup(){
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
    echo "$(tput setaf 1) $(tput setab 7)Please install node to proceed further."
    return 0;
fi

if test -z "$NPM" 
then
    echo "$(tput setaf 1) $(tput setab 7)Please install npm to proceed further."
    return 0;
fi

# clientSetup
# serverSetup

echo "Start Server ? y/n"
read CHOICE

if [ $CHOICE == 'y' ] || [ $CHOICE == 'Y' ];
then
echo "$(tput setaf 1) $(tput setab 7)THIS REPOSITORY REQUIRES NODE V14+.MAKE SURE ITS INSTALLED."
startServer
fi

}

main

