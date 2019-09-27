import BiokitModel from '../../src/models/biokits.model';

// Returns a random integer within the given integer range
export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Returns a random date within the given range of Date objects
export function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Return a random ID from the array of IDs
export function getBioKitId() {
  let ids = ['a1234', 'b3456'];
  return ids[Math.floor(Math.random() * ids.length)];
}

// Return array of BioKit models with distinct property values
export function generateSampleBioKits() {
  let ids = ['a1234', 'b3456', 'c5678'];
  let bioKits = [];
  for (let index = 0; index < ids.length; index++) {
    // eslint-disable-next-line security/detect-object-injection
    let id = ids[index];
    bioKits.push(
      new BiokitModel({
        bioKitId: id,
        accessible: index % 2,
        private: index % 2,
        available: index === 2 ? false : true
      })
    );
  }
  return bioKits;
}

export function randomTimezone(index) {
  return index % 2 ? 'America/Toronto' : 'America/Vancouver';
}

// Returns an alphanueric string of a given length
export function randomString(length) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    let rnum = Math.floor(Math.random() * chars.length);
    result += chars.substring(rnum, rnum + 1);
  }
  return result;
}

// Returns a string in the format of the BIL# (1 letter followed by 12 digits)
export function randomBil() {
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
  const numbers = '1234567890';
  let result = '';
  let rchar = Math.floor(Math.random() * char.length);
  result += char.substring(rchar, rchar + 1);
  for (let i = 0; i < 12; i++) {
    let rnum = Math.floor(Math.random() * numbers.length);
    result += numbers.substring(rnum, rnum + 1);
  }
  return result;
}

// Returns random province from array
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

// Returns random timeslot for use in generating appointment date objects
export function randomTimeSlot() {
  let timeslots = [0, 15, 30, 45];
  return timeslots[Math.floor(Math.random() * timeslots.length)];
}
