#!/bin/sh
echo "window._env_ = " > ./public/static/assets/js/env-config.js

for i in $(cat env-curl.txt)
do
echo $i
curl -H "Accept: application/json" -H "Private-Token: gkvnJ2yQZpNnXWEkUkek" $i >> ./public/static/assets/js/env-config.js 
done
echo " ;" >> ./public/static/assets/js/env-config.js

#for ARGUMENT in "$@"
#do
#   KEY=$(echo $ARGUMENT | cut -f1 -d=)
#   echo $KEY
#
#   KEY_LENGTH=${#KEY}
#   echo $KEY_LENGTH
#
#   VALUE="${ARGUMENT:$KEY_LENGTH+1}"
#   echo $VALUE
#
#   echo "$KEY:'$VALUE'," >> ./env-config.js 
#done
#echo " };" >> ./public/static/assets/js/env-config.js

