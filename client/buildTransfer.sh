#!/bin/bash

# chmod u+x selectEnv.sh DON'T NEED
# sh buildTransfer.sh build dev

# builds the client and uses scp to transfer to the target server
# to make executable chmod 755 <name> or just sh <name>
# if launch template was used, must del the references in /Users/hannah/.ssh/known_hosts

echo input 1 $1
echo input 2 $2

if [[ $1 = 'build' ]]
then 
    sh selectEnv.sh $2
    echo 'Starting Client build...'
    rm -r build
    npm run build
else 
    echo 'Skipping the build stage..'
fi

declare size
declare RESULT
if [[ $2 = 'dev' ]]
then 
    echo 'DEV'
    scp -r -i ~/.ssh/jc70-RDC-DEV-PRIV.pem build ubuntu@54.244.80.214:~/
    respond=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-54-244-80-214.us-west-2.compute.amazonaws.com "'sh' '-c'  cd build && du -s build | cut -f 1" > log)
    respond2=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-54-244-80-214.us-west-2.compute.amazonaws.com "'sh' '-c'  cd build && du -s build | cut -f 1")
    echo build dir size on EC2 $respond2
    sizeTocompare=500
    [[ ${respond2} -gt ${sizeTocompare} ]] && echo "build has been copied to DEV" || echo "DEV build directory is wrong size!"
    [[ ${respond2} -gt ${sizeTocompare} ]] && ready=1 || ready=0
    if [[ $ready = 1 ]]
    then 
        echo Listing /var/www/
        respond3=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-54-244-80-214.us-west-2.compute.amazonaws.com "cd /var/www && ls")
        echo $respond3
        echo Removig previous move script if it exists..
        respond4a=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-54-244-80-214.us-west-2.compute.amazonaws.com "rm moveAndRestart.sh")
        # echo Respond4a: $respond4a
        echo Moving build to /var/www/planner and restarting Nginx...
        respond4b=$(scp -r -i ~/.ssh/jc70-RDC-DEV-PRIV.pem moveAndRestart.sh ubuntu@54.244.80.214:~/)
        # echo Respond4b: $respond4b
        respond5=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-54-244-80-214.us-west-2.compute.amazonaws.com "sh moveAndRestart.sh")
        echo Respond5: $respond5
        echo Removig move script....
        respond6=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-54-244-80-214.us-west-2.compute.amazonaws.com "rm moveAndRestart.sh")
        # echo Respond6: $respond6
        echo Renaming .env back to original:
        sh renameEnv.sh dev 
        echo DEV Client has been updated, previous insight folder stored in $respond5
    else
        echo No files in DEV build to move!!
    fi


elif [[ $2 = 'stageX' ]]
then
    echo 'STAGE'
    scp -r -i ~/.ssh/jc70-RDC-DEV-PRIV.pem build ubuntu@54.244.80.214:~/
    respond=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-52-20-188-13.compute-1.amazonaws.com "'sh' '-c'  cd build && du -s build | cut -f 1" > log)
    respond2=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-52-20-188-13.compute-1.amazonaws.com "'sh' '-c'  cd build && du -s build | cut -f 1")
    sizeTocompare=70000
    [[ ${respond2} -gt ${sizeTocompare} ]] && echo "build has been copied to DEV" || echo "DEV build directory is wrong size!"
    [[ ${respond2} -gt ${sizeTocompare} ]] && ready=1 || ready=0
    if [[ $ready = 1 ]]
    then 
        echo Listing /var/www/
        respond3=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-52-20-188-13.compute-1.amazonaws.com "cd /var/www && ls")
        echo $respond3
        echo Removig previous move script if it exists..
        respond4a=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-52-20-188-13.compute-1.amazonaws.com "rm moveAndRestart.sh")
        # echo Respond4a: $respond4a
        echo Moving build to /var/www/insight and restarting Nginx...
        respond4b=$(scp -r -i ~/.ssh/jc70-RDC-DEV-PRIV.pem moveAndRestart.sh ubuntu@54.244.80.214:~/)
        # echo Respond4b: $respond4b
        respond5=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-52-20-188-13.compute-1.amazonaws.com "sh moveAndRestart.sh")
        echo Respond5: $respond5
        echo Removig move script....
        respond6=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-52-20-188-13.compute-1.amazonaws.com "rm moveAndRestart.sh")
        # echo Respond6: $respond6
        echo Renaming .env back to original:
        sh renameEnv.sh stage 
        echo STAGE Client has been updated, previous insight folder stored in $respond5
    else
        echo No files in STAGE build to move!!
    fi

elif [[ $2 = 'prodX' ]]
then
    echo 'PROD-I'
    scp -r -i ~/.ssh/jc70-RDC-DEV-PRIV.pem build ubuntu@54.244.80.214:~/
    respond=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-44-214-115-77.compute-1.amazonaws.com "'sh' '-c'  cd build && du -s build | cut -f 1" > log)
    respond2=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-44-214-115-77.compute-1.amazonaws.com "'sh' '-c'  cd build && du -s build | cut -f 1")
    sizeTocompare=70000
    [[ ${respond2} -gt ${sizeTocompare} ]] && echo "build has been copied to DEV" || echo "DEV build directory is wrong size!"
    [[ ${respond2} -gt ${sizeTocompare} ]] && ready=1 || ready=0
    if [[ $ready = 1 ]]
    then 
        echo Listing /var/www/
        respond3=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-44-214-115-77.compute-1.amazonaws.com "cd /var/www && ls")
        echo $respond3
        echo Removig previous move script if it exists..
        respond4a=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-44-214-115-77.compute-1.amazonaws.com "rm moveAndRestart.sh")
        # echo Respond4a: $respond4a
        echo Moving build to /var/www/insight and restarting Nginx...
        respond4b=$(scp -r -i ~/.ssh/jc70-RDC-DEV-PRIV.pem moveAndRestart.sh ubuntu@54.244.80.214:~/)
        # echo Respond4b: $respond4b
        respond5=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-44-214-115-77.compute-1.amazonaws.com "sh moveAndRestart.sh")
        echo Respond5: $respond5
        echo Removig move script....
        respond6=$(ssh -i ~/.ssh/jc70-RDC-DEV-PRIV.pem ubuntu@ec2-44-214-115-77.compute-1.amazonaws.com "rm moveAndRestart.sh")
        # echo Respond6: $respond6
        echo Renaming .env back to original:
        sh renameEnv.sh prod-i 
        echo PROD-I Client has been updated, previous insight folder stored in $respond5
        
    else
        echo No files in PROD-I build to move!!
    fi
    
else 
    echo 'Error: Supply a server destination input.' >&2
    exit 1
fi
