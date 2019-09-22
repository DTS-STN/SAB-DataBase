FROM node:8.16.1-alpine AS builder
WORKDIR /app
COPY package* ./
RUN npm install
COPY src/ src/
COPY .babelrc .babelrc
RUN npm run build
RUN npm prune --production

FROM node:8.16.1-alpine AS production

ENV MONGO_URI='autoreplace'
ENV MONGO_PORT='autoreplace'
ENV MONGO_USER='autoreplace'
ENV MONGO_PASSWORD='autoreplace'
ENV MONGO_DATABASE='autoreplace'

WORKDIR /app
COPY --from=builder /app .

EXPOSE 4001
CMD [ "npm", "start" ]