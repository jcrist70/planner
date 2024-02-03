#!/bin/bash

echo build for $1
dotEnv=$(du -s .env | cut -f 1) 
if [[ $dotEnv > 0 ]]
then
    echo .env exists, proceeding to rename...
    dotEnvL=$(du -s .env_local | cut -f 1)
    if [[ $dotEnvL = '' && $1 = 'loc' ]]
    then
        echo .env_local exists
        mv .env .env_local 
    else
        echo .env_local not being used
    fi
    dotEnvA=$(du -s .env_aws_a | cut -f 1)
    if [[ $dotEnvA = '' && $1 = 'prod-i' ]]
    then
        echo .env_aws_a exists
        mv .env .env_aws_a 
    else
        echo .env_aws_a not being used
    fi
    dotEnvS=$(du -s .env_aws_s | cut -f 1)
    if [[ $dotEnvS = '' && $1 = 'stage' ]]
    then
        echo .env_aws_s exists
        mv .env .env_aws_s 
    else
        echo .env_aws_s not being used
    fi
    dotEnvD=$(du -s .env_aws_d | cut -f 1)
    if [[ $dotEnvD = '' && $1 = 'dev' ]]
    then
        echo .env_aws_d exists
        mv .env .env_aws_d 
    else
        echo .env_aws_d not being used
    fi
else
    echo .env does not exist, aborting!!
fi
