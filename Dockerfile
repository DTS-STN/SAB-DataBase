FROM node:8

ENV CONNECTION_STRING=iwillbeupdatedautomatically

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4001

CMD ["npm", "start"]
