FROM pkosiec/mongo-seeding:latest

#
# Copy sample data
#

COPY ./data_seed_db/data /import-data

#
# Copy dependencies
#

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

WORKDIR /import-data