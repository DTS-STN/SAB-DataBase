import LocationModel from '../../src/models/location.model';
import AppointmentModel from '../../src/models/appointments.model';
import * as db from '../DatabaseHelper';
import * as Randomizers from './Randomizers';
import moment from 'moment';

// User defined number of appointments and location documents to create
let numAppoints = process.env.NUMAPPOINTMENTS || 100;
let numLocations = process.env.NUMLOCATIONS || 100;

const populateDatabase = async () => {
  for (let i = 0; i < numAppoints; i++) {
    await AppointmentModel.create({
      appointmentId: i,
      clientEmail: `${Randomizers.randomString(10)}@example.com`,
      phoneNumber: Randomizers.randomInt(1000000000, 9999999999),
      locationId: Randomizers.randomInt(0, numLocations),
      // Returns one of two Biokit IDs
      bioKitId: Randomizers.getBioKitId(),
      // Returns string in BIL# format
      bil: Randomizers.randomBil(),
      // Picks a random weekday in the week, 2 weeks from the current week and
      // selects a random hour within working hours, and then picks a random slot in
      // 15 minute increments
      date: moment(
        Randomizers.randomDate(
          moment()
            .startOf('week')
            .add(15, 'days')
            .toDate(),
          moment()
            .startOf('week')
            .add(19, 'days')
            .toDate()
        )
      )
        .hours(Randomizers.randomInt(7, 11))
        .minutes(Randomizers.randomTimeSlot())
        .seconds(0)
        .milliseconds(0)
        .toDate(),
      // Returns a date and time between the beginning of the week and the time of
      // the object's creation
      dateSubmitted: Randomizers.randomDate(
        moment()
          .startOf('week')
          .toDate(),
        moment().toDate()
      ),
      // Every 20 appointments are maintenance appointments
      maintenance: !(i % 20),
      // Every 10 appointments are flagged as cancelled by the client
      cancelledByClient: !(i % 10),
      // Every 15 appointments are flagged as cancelled by the location/site
      cancelledByLocation: !(i % 15)
    });
  }

  for (let i = 0; i < numLocations; i++) {
    await LocationModel.create({
      locationId: i,
      locationName: Randomizers.randomString(8),
      locationRegion: Randomizers.randomString(3),
      locationType: Randomizers.randomString(3),
      locationAddress: Randomizers.randomString(15),
      locationCity: Randomizers.randomString(6),
      postalCode: Randomizers.randomString(6),
      // Get a random province from an array of provinces
      locationProvince: Randomizers.randomProvince(),
      // Get a string representing the 24-hour format range of business hours for this location
      hours: `${Randomizers.randomInt(8, 10)}:00-${Randomizers.randomInt(
        16,
        17
      )}:00`,
      // Creates a week-long closure period for the location a week from the when
      // the object was initially generated
      closures: [
        {
          periodStart: moment()
            .startOf('week')
            .add(7, 'days')
            .toDate(),
          periodEnd: moment()
            .endOf('week')
            .add(6, 'days')
            .toDate()
        }
      ],
      bioKitAmount: 3,
      // Get array of 3 BioKits: 1 flagged accessible, 1 flagged unavailable
      bioKits: Randomizers.generateBioKits()
    });
  }
};

async function main() {
  db.init().then(async () => {
    await populateDatabase();
    db.close();
  });
}

main();
