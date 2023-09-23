# Dockerfile

# base image
FROM registry.tech1a.co:81/repository/tech1a-docker-registry/node:14.18
#FROM node:alpine

ENV TZ=Asia/Tehran


#RUN apt-get update
#RUN apt-get install tzdata -y

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
EXPOSE 80

#RUN rm -rf /usr/src/node_modules
RUN yarn cache clean


#Start App
ENTRYPOINT /bin/bash -x ./entrypoint.sh && yarn start
