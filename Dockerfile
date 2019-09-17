FROM node:10.15.3-jessie-slim

ENV MONGO_URI='autoreplace'
ENV MONGO_PORT='autoreplace'
ENV MONGO_USER='autoreplace'
ENV MONGO_PASSWORD='autoreplace'
ENV MONGO_DATABASE='autoreplace'

ENV MONGO_URI 'localhost'
ENV MONGO_PORT '27017'
ENV MONGO_USER ''
ENV MONGO_PASSWORD ''
ENV MONGO_DATABASE 'DTS'


RUN npm install --production
RUN npm install --save-dev babel-loader@^8.0.0-beta
RUN npm install jsonwebtoken

COPY . .

EXPOSE 4001

CMD ["npm", "start"]

