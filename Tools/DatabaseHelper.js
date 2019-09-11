// Mongo authentication and insertion
// Import mongo model
import locationModel from '../src/models/location.model';
import mongoose from 'mongoose';
require('dotenv').config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoURI = process.env.MONGO_URI;
const mongoPort = process.env.MONGO_PORT;
const mongoDB = process.env.MONGO_DATABASE;

// Initialise connection to database
export const init = () => {
  return new Promise((resolve, reject) => {
    // create connection string through env variables
    console.log(mongoURI);

    mongoose
      .connect(
        `mongodb://${mongoUser}:${mongoPassword}@${mongoURI}:${mongoPort}/${mongoDB}`,
        {
          useNewUrlParser: true
        }
      )
      .then(console.log('Connection successful'))
      .catch(err => console.log(err));

    mongoose.set('useCreateIndex', true);
    return mongoose.connection
      .once('open', () => {
        console.log('Connection to the database established');
        resolve();
      })
      .on('error', error => {
        console.log(`Connection error: ${error}`);
        reject();
      })
      .on('disconnected', () => {
        console.log('Database disconnected');
      });
  });
};

export const close = () => {
  mongoose.connection.close();
};

// Takes multiple models/documents, inserts it into the database
export const insert = locationModels => {
  // send this documentr to the database
  console.log(locationModels);
  return locationModel.collection.insertMany(locationModels, onInsert);
};

const onInsert = err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Location documents were successfully stored.`);
  }
};
