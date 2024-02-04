#!/bin/bash

echo build for $1
dotEnv=$(du -s .env | cut -f 1) 
if [[ $dotEnv > 0 ]]
then
    echo .env exists, must rename it and restart script!!
else
    echo .env does not exist, proceeding to select...
    dotEnvL=$(du -s .env_local | cut -f 1)
    if [[ $dotEnvL > 0 && $1 = 'loc' ]]
    then
        echo .env_local exists
        mv .env_local .env
    else
        echo .env_local not being used
    fi
    dotEnvA=$(du -s .env_aws_a | cut -f 1)
    if [[ $dotEnvA > 0 && $1 = 'prod-i' ]]
    then
        echo .env_aws_a exists
        mv .env_aws_a .env
    else
        echo .env_aws_a not being used
    fi
    dotEnvS=$(du -s .env_aws_s | cut -f 1)
    if [[ $dotEnvS > 0 && $1 = 'stage' ]]
    then
        echo .env_aws_s exists
        mv .env_aws_s .env
    else
        echo .env_aws_s not being used
    fi
    dotEnvD=$(du -s .env_aws_d | cut -f 1)
    if [[ $dotEnvD > 0 && $1 = 'dev' ]]
    then
        echo .env_aws_d exists
        mv .env_aws_d .env
    else
        echo .env_aws_d not being used
    fi
fi
