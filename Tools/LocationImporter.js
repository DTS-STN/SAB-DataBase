// Temporary tool used to import location data to our mongo data model
// from a CSV file provided by product owners

import csv from 'csv-parser';
import * as db from './DatabaseHelper';
import locationModel from '../src/models/location.model';
import { createReadStream } from 'fs';

let locationsFormatted = [];

// get read stream, seperate lines to sites[]
const readFromFile = path => {
  return new Promise((resolve, reject) => {
    let readstream = createReadStream(path);
    let csvLocationsArray = [];
    readstream
      .pipe(
        csv(['region', 'type', 'office', 'physicalAddress', 'bioKits', 'notes'])
      )
      .on('data', data => {
        csvLocationsArray.push(data);
      });
    readstream.on('error', e => {
      reject(e);
    });
    return readstream.on('end', () => {
      csvLocationsArray.shift(); // Removes the first record in the array, which in this case is the headers row, since we explicitly set our own values
      resolve(csvLocationsArray);
    });
  });
};

// seperate the location string (undecided / unused)
const seperateLocation = address => {
  let addressArray = address.split(',');
  addressArray = addressArray.map(addressValue => {
    return addressValue.trim();
  });
  return addressArray;
};

const joinPhysicalAddress = array => {
  return array.join(',');
};

const createModels = location => {
  let addressArray = seperateLocation(location.physicalAddress);
  let model = new locationModel({
    locationName: location.office,
    locationAddress: joinPhysicalAddress(
      addressArray.slice(0, addressArray.length - 3)
    ),
    locationCity: addressArray[addressArray.length - 3],
    postalCode: addressArray[addressArray.length - 1],
    locationProvince: addressArray[addressArray.length - 2],
    bioKitAmount: parseInt(location.bioKits)
  });
  locationsFormatted.push(model);
};

// Main
readFromFile('Tools/Biometrics_Sitescsv.csv')
  .then(locationsRaw => {
    locationsRaw.forEach(createModels);
  })
  .then(() => {
    db.init().then(() => {
      db.insert(locationsFormatted);
    });
  });
