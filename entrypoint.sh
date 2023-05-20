#!/bin/sh
echo "window._env_ = { " >> ./env-config.js
for ARGUMENT in "$@"
do
   KEY=$(echo $ARGUMENT | cut -f1 -d=)

   KEY_LENGTH=${#KEY}
   VALUE="${ARGUMENT:$KEY_LENGTH+1}"

   echo "$KEY:'$VALUE'," >> ./env-config.js 
done
echo " };" >> ./env-config.js
