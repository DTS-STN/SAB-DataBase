import LocationModel from '../../src/models/location.model';
import AppointmentModel from '../../src/models/appointments.model';
import * as db from '../DatabaseHelper';
import * as Randomizers from './Randomizers';
const moment = require('moment');

let numAppoints = process.env.NUMAPPOINTMENTS || 100;
let numLocations = process.env.NUMLOCATIONS || 100;

const populateDatabase = async () => {
  for (let i = 0; i < numAppoints; i++) {
    await AppointmentModel.create({
      appointmentId: i,
      clientEmail: `${Randomizers.randomString(10)}@example.com`,
      phoneNumber: parseInt(Randomizers.randomInt(1000000000, 9999999999)),
      locationId: Randomizers.randomInt(1, numLocations),
      bioKitId: Randomizers.getBioKitId(),
      bil: Randomizers.randomBil(),
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
      dateSubmitted: Randomizers.randomDate(
        moment()
          .startOf('week')
          .toDate(),
        moment().toDate()
      ),
      maintenance: !(i % 20),
      cancelledByClient: !(i % 10),
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
      locationProvince: Randomizers.randomProvince(),
      hours: `${Randomizers.randomInt(8, 10)}:00-${Randomizers.randomInt(
        15,
        17
      )}:00`,
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
      bioKitAmount: Randomizers.randomInt(1, 4),
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
