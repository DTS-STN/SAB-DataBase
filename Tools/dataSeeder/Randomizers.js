import BiokitModel from '../../src/models/biokits.model';

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDate(start, end) {
  // var nr_days1 = 30 * 365;
  // var nr_days2 = -20 * 365;
  // // milliseconds in one day
  // var one_day = 1000 * 60 * 60 * 24;
  // // get a random number of days passed between 1950 and 2000
  // var days = randomInt(nr_days2, nr_days1);

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function getBioKitId() {
  let ids = ['a1234', 'b3456', 'c5678'];
  return ids[Math.floor(Math.random() * ids.length)];
}

export function generateBioKits() {
  let ids = ['a1234', 'b3456', 'c5678'];
  let bioKits = [];
  for (let index = 0; index < ids.length; index++) {
    // eslint-disable-next-line security/detect-object-injection
    let id = ids[index];
    bioKits.push(
      new BiokitModel({
        bioKitId: id,
        accessible: index % 2,
        available: index % 2
      })
    );
  }
  return bioKits;
}

export function randomString(length) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  var result = '';
  for (var i = 0; i < length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    result += chars.substring(rnum, rnum + 1);
  }
  return result;
}

export function randomBil() {
  var char = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
  var numbers = '1234567890';
  var result = '';
  var rchar = Math.floor(Math.random() * char.length);
  result += char.substring(rchar, rchar + 1);
  for (var i = 0; i < 12; i++) {
    var rnum = Math.floor(Math.random() * numbers.length);
    result += numbers.substring(rnum, rnum + 1);
  }
  return result;
}

export function randomProvince() {
  let provinces = [
    'Ontario',
    'Saskatchewan',
    'Alberta',
    'British Columbia',
    'Prince Edward Island',
    'Nova Scotia',
    'Newfoundland and Labrador',
    'New Brunswick',
    'Manitoba',
    'Quebec'
  ];
  return provinces[Math.floor(Math.random() * provinces.length)];
}

export function randomTimeSlot() {
  let timeslots = [0, 15, 30, 45];
  return timeslots[Math.floor(Math.random() * timeslots.length)];
}
