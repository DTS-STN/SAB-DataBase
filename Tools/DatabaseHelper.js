// Mongo authentication and insertion
// Import mongo model
import locationModel from '../src/models/location.model';
import mongoose from 'mongoose';

// Initialise connection to database
export const init = () => {
  // create connection string through env variables
  mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true
  });
  mongoose.set('useCreateIndex', true);
  mongoose.connection
    .once('open', () => {
      console.log('Connection has been made for data import');
    })
    .on('error', error => {
      console.log(`Connection error: ${error}`);
    });
};

// Takes multiple models/documents, inserts it into the database
export const insert = locationModels => {
  // send this documentr to the database
  locationModel.collection.insertMany(locationModels, onInsert);
};

const onInsert = (err, docs) => {
  if (err) {
    // TODO: Handle error
  } else {
    console.info(
      '%d location documents were successfully stored.',
      docs.length
    );
  }
};
