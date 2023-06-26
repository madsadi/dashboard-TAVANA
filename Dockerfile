# Dockerfile

# base image
FROM registry.tech1a.co:81/repository/tech1a-docker-registry/node:14.18
#FROM node:alpine

ENV TZ=Asia/Tehran


#RUN apt-get update
#RUN apt-get install tzdata -y


#Set BaseUrl
ENV COMMISSION_BASE_URL=http://172.24.65.20:9007
ENV  NETFLOW=http://172.24.65.20:8091
ENV  ADMIN_GATEWAY=http://172.24.65.20:9020
ENV  IDP=https://cluster.tech1a.co
ENV  ONLINE_TRADING=http://cluster.tech1a.co
ENV FILE_SERVER=http://cluster.tech1a.co:9073
ENV  MARKETER_ADMIN=http://stgmarketer-admin.tech1a.co

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# set permission
RUN chmod +x /usr/src/entrypoint.sh
CMD /usr/src/entrypoint.sh

# install dependencies
RUN yarn install

# start app
RUN yarn run build
EXPOSE 3000

#RUN rm -rf /usr/src/node_modules
RUN yarn cache clean


#Start App
ENTRYPOINT /bin/bash -x ./entrypoint.sh COMMISSION_BASE_URL=${COMMISSION_BASE_URL} NETFLOW=${NETFLOW} ADMIN_GATEWAY=${ADMIN_GATEWAY} IDP=${IDP} ONLINE_TRADING=${ONLINE_TRADING} FILE_SERVER=${FILE_SERVER} MARKETER_ADMIN=${MARKETER_ADMIN} && mv ./env-config.js ./public/static/assets/js && yarn start
