import LocationModel from '../../src/models/location.model';
import AppointmentModel from '../../src/models/appointments.model';
import BiokitModel from '../../src/models/biokits.model';
import mongoose from 'mongoose';
require('dotenv').config();

// get input for number of locations and appointments
// start a loop for each model
// populate with random data
// add each to database
let numAppoints = process.env.NUMAPPOINTMENTS || 100
let numLocations = process.env.NUMLOCATIONS || 100

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate() {
    // aprox nr of days since 1970 untill 2000: 30years * 365 days
    var nr_days1 = 30*365;
    // aprox nr of days since 1950 untill 1970: 20years * 365 days
    var nr_days2 = -20*365;

    // milliseconds in one day
    var one_day=1000*60*60*24

    // get a random number of days passed between 1950 and 2000
    var days = randomInt(nr_days2, nr_days1);

    return new Date(days*one_day)
}

function randomString(length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      var result = '';
      for (var i=0; i<length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          result += chars.substring(rnum,rnum+1);
      }
      return result;
    }
// open database connection
mongoose.connect('mongodb://localhost:27018/test', {useNewUrlParser: true});
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('Connection to the database established');
});

for( let i = 0; i < numAppoints; i++){
    let appointment = AppointmentModel.create({
        appointmentId: i,
        clientEmail: `${randomString(10)}@example.com`,
        phoneNumber: randomInt(10000000000, 99999999999),
        locationId: randomString(3),
        bioKitId: randomString(6),
        bil: randomString(3),
        date: randomDate(),
        dateSubmitted: randomDate(),
        maintenance: i%2,
        cancelledByClient: i%2,
        cancelledByLocation: i%2
      })
}

for( let i = 0; i < numLocations; i++){
    let location = LocationModel.create({
        locationId: i,
        locationName: randomString(8),
        locationRegion: randomString(3),
        locationType: randomString(3),
        locationAddress: randomString(15),
        locationCity: randomString(6),
        postalCode: randomString(6),
        locationProvince: randomString(2),
        hours: `${randomInt(0,24)}:${randomInt(0,24)}-${randomInt(0,24)}:${randomInt(0,24)}`,
        closures: [
          {
            periodStart: randomDate(),
            periodEnd: randomDate()
          }
        ],
        bioKitAmount: randomInt(1,999),
        bioKits: BiokitModel.create({
            bioKitId: randomString(5),
            accessible: i%2,
            available: i%2
        })
      })
}

// db.close()
db.on('disconnected', () => {
    console.log('Connection closed');
})