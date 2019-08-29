// Temporary tool used to import location data to our mongo data model
// from a CSV file provided by product owners

import csv from 'csv-parser';
<<<<<<< HEAD
import * as db from "./DatabaseHelper";
import locationModel from "../src/models/location.model";
import { createReadStream } from 'fs';


// get read stream, seperate lines to sites[]
const readFromFile = (path) => {
    let counter = 0 // Count how many records were successfully read
    let readstream = createReadStream(path)
    let csvLocationsArray = []

    readstream.pipe(csv(['region', 'type', 'office', 'physicalAddress', 'bioKits', 'notes']))
    .on('data', (data) => {
        csvLocationsArray.push(data)
=======
import { createReadStream } from 'fs';

const sites = []
var counter = 0
var readstream = createReadStream(require('path').resolve('Tools/Biometrics_Sitescsv.csv'))

readstream.pipe(csv())
    .on('data', (data) => {
        sites.push(data)
>>>>>>> 136e3e4a060c187ecfff0e6414cb040bda6a7068
        counter++
    })
    .on('end', () => {
        console.log(`${counter} records read from file`)
<<<<<<< HEAD
        locationsArray.shift() // Removes the first record in the array, which in this case is the headers row, since we explicitly set our own values
    })

    return csvLocationsArray
}

// seperate the location string (undecided / unused)
const seperateLocation = (address) => {
    // city = address[-3]
    // proince = address[-2]
    // streetAddress = address[0:-3] + address[-1]
    return addressArray
}

// Main
let locationsRaw = readFromFile('Tools/Biometrics_Sitescsv.csv')
let locationsFormatted = []
//db.init() //Init database
for (location in locationsRaw){
    let model = new locationModel({
        locationAddress: String,
        locationCity: String,
        locationProvince: String,
        locationProvinceFr: String,
        hours: String,
        closures: [
            {
                periodStart: Date,
                periodEnd: Date
            }
        ],
        bioKits: {
            type: [BioKitSchema],
            default: undefined
        }
    })
    locationsFormatted.push(model)

}
// Read all records from csv into locationModels
db.insert(locationsFormatted)
=======
    })

// Main
// db.init() Init database
// readFromFile(path)
// for x in sites{
//  db.insert(x)
//}

// Function get read stream, seperate lines to sites[]
const readFromFile = (path) => {
// Create read stream from file at {path}
// parse each line into a mongo model
}

// seperate the location string (undecided / unused)
const seperateLocation = (addressString) => {

}
>>>>>>> 136e3e4a060c187ecfff0e6414cb040bda6a7068
