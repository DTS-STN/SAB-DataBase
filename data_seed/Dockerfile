FROM pkosiec/mongo-seeding:latest

WORKDIR /sample-data/

#
# Copy sample data and helpers and dependencies
#

COPY . /sample-data/

#
# Install dependencies
#

RUN rm -rf node_modules && npm install

#
# Set environmental variables (optional)
#

ENV DB_HOST 127.0.0.1
ENV DB_NAME testing
ENV DB_PORT 27017
ENV DROP_DATABASE true
ENV REPLACE_ID true


#
# Set default workspace to not specify it every time the image is ran
#

WORKDIR /sample-data/data
