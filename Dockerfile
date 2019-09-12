FROM node:8

ENV MONGO_URI
ENV MONGO_PORT
ENV MONGO_USER
ENV MONGO_PASSWORD
ENV MONGO_DATABASE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 4001

CMD ["npm", "start"]
