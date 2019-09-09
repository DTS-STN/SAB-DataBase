import LocationModel from '../../src/models/location.model';
import AppointmentModel from '../../src/models/appointments.model';
import BiokitModel from '../../src/models/biokits.model';
import * as db from '../DatabaseHelper';
import * as Randomizers from './Randomizers';

let numAppoints = process.env.NUMAPPOINTMENTS || 100;
let numLocations = process.env.NUMLOCATIONS || 100;

const populateDatabase = async () => {
  for (let i = 0; i < numAppoints; i++) {
    await AppointmentModel.create({
      appointmentId: i,
      clientEmail: `${Randomizers.randomString(10)}@example.com`,
      phoneNumber: Randomizers.randomInt(10000000000, 99999999999),
      locationId: Randomizers.randomString(3),
      bioKitId: Randomizers.randomString(6),
      bil: Randomizers.randomString(3),
      date: Randomizers.randomDate(),
      dateSubmitted: Randomizers.randomDate(),
      maintenance: i % 2,
      cancelledByClient: i % 2,
      cancelledByLocation: i % 2
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
      locationProvince: Randomizers.randomString(2),
      hours: `${Randomizers.random24Hour(8, 10)}:${Randomizers.random24Hour(
        0,
        59
      )}-${Randomizers.random24Hour(15, 17)}:${Randomizers.random24Hour(
        0,
        59
      )}`,
      // `${Randomizers.randomInt(8, 10)}:00-${Randomizers.randomInt(
      //   15,
      //   17
      // )}:00`,
      closures: [
        {
          periodStart: Randomizers.randomDate(),
          periodEnd: Randomizers.randomDate()
        }
      ],
      bioKitAmount: Randomizers.randomInt(1, 999),
      bioKits: new BiokitModel({
        bioKitId: Randomizers.randomString(5),
        accessible: i % 2,
        available: i % 2
      })
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
