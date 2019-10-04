FROM node:10.15.3-jessie-slim

ENV MONGO_URI 'autoreplace'
ENV MONGO_PORT 'autoreplace'
ENV MONGO_USER 'autoreplace'
ENV MONGO_PASSWORD 'autoreplace'
ENV MONGO_DATABASE 'autoreplace'
ENV MONGO_CONNECTION_STRING ''

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 4001

CMD ["npm", "start"]