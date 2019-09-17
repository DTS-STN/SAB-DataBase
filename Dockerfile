FROM node:8.16.1-alpine AS builder
WORKDIR /app
COPY package* ./
RUN npm install
COPY src/ src/
COPY .babelrc .babelrc
RUN npm run build
RUN npm prune --production

FROM node:8.16.1-alpine AS production

ENV MONGO_URI 'localhost'
ENV MONGO_PORT '27017'
ENV MONGO_USER ''
ENV MONGO_PASSWORD ''
ENV MONGO_DATABASE 'DTS'


WORKDIR /app
COPY --from=builder /app .
#CMD [ "/bin/sh" ]
CMD [ "npm", "start" ]
