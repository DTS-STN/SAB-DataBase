// Temporary tool used to import location data to our mongo data model
// from a CSV file provided by product owners

import csv from 'csv-parser';
import { createReadStream } from 'fs';

const sites = []
var counter = 0
var readstream = createReadStream(require('path').resolve('Tools/Biometrics_Sitescsv.csv'))

readstream.pipe(csv())
    .on('data', (data) => {
        sites.push(data)
        counter++
    })
    .on('end', () => {
        console.log(`${counter} records read from file`)
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