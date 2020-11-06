FROM node:12-alpine

COPY . /api-server

WORKDIR /api-server

RUN yarn install

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && yarn initialiseDB && yarn start
EXPOSE 5000