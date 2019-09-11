FROM node:8

ENV MONGO_URI=iwillbeupdatedautomatically

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4001

CMD ["npm", "start"]
