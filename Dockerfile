FROM node:8

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 4001

CMD ["node", "www/server.js"]

