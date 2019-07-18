FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4001

CMD ["npm", "start"]











FROM node:10.15.3-jessie-slim

ADD VERSION .

RUN apt-get update
RUN apt-get install -y git-core
ENV GITREPO github.com/MTS-STM/AEIOU-Database
ENV GITPROJECT AEIOU-Database
ENV GITUSER changeme
ENV GITPASSWORD changeme
ENV PORT=4001
ENV CONNECTION_STRING='mongodb+srv://EasyParade:CLbtttYXk34dh8oM@aeiou-cluster-ra9rp.azure.mongodb.net/users?retryWrites=true'
ENV COLLECTION='users'
ENV LAUNCHFILE server.js
ENV BRANCHNAME master


WORKDIR /home/node
COPY ./scripts/start.sh .
CMD [ "./start.sh" ]
