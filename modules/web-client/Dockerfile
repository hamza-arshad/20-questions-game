FROM node:12-alpine AS build

RUN mkdir -p /web-client

WORKDIR /web-client

COPY . /web-client

RUN yarn install && yarn build

CMD yarn serve

EXPOSE 8080