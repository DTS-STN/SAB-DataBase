// Temporary tool used to import location data to our mongo data model
// from a CSV file provided by product owners

const csv = require('csv-parser');
const fs = require('fs');

const sites = [];

// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.createReadStream(
  require('path').resolve(__dirname, 'Biometrics_Sitescsv.csv')
)
  .pipe(csv())
  .on('data', data => {
    sites.push(data);
  })
  .on('end', () => {
    console.log(sites);
  });
