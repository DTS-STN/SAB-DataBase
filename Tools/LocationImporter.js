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
