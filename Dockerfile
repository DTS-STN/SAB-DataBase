FROM node:10.15.3-jessie-slim

ENV MONGO_URI='autoreplace'
ENV MONGO_PORT='autoreplace'
ENV MONGO_USER='autoreplace'
ENV MONGO_PASSWORD='autoreplace'
ENV MONGO_DATABASE='autoreplace'

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
RUN npm install --save-dev babel-loader@^8.0.0-beta
RUN npm install jsonwebtoken

COPY . .

EXPOSE 4001

CMD ["npm", "start"]

