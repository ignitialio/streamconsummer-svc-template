FROM node:12-alpine

RUN mkdir -p /opt && mkdir -p /opt/streamconsummer

ADD . /opt/streamconsummer

WORKDIR /opt/streamconsummer

RUN npm install && npm run client:build

CMD ["node", "./server/index.js"]
