// Mongo authentication and insertion
// Import mongo model
import locationModel from '../src/models/location.model';
import mongoose from 'mongoose';
require('dotenv').config();

// Initialise connection to database
export const init = () => {
  return new Promise((resolve, reject) => {
    // create connection string through env variables
    mongoose.connect(process.env.LOCAL_CONNECTION_STRING, {
      useNewUrlParser: true
    });
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
