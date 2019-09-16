FROM node:8

ENV MONGO_URI='localhost'\
    MONGO_PORT=''\
    MONGO_USER=''\
    MONGO_PASSWORD=''\
    MONGO_DATABASE='dts'

WORKDIR /usr/src/app
# Install dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the app
COPY . .
# Compile the code with babel then remove dev dependencies
RUN npm run build && npm prune --production
# Expose default app port and run the app
EXPOSE 4001
CMD ["npm", "start"]
