export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDate() {
  var nr_days1 = 30 * 365;
  var nr_days2 = -20 * 365;
  // milliseconds in one day
  var one_day = 1000 * 60 * 60 * 24;
  // get a random number of days passed between 1950 and 2000
  var days = randomInt(nr_days2, nr_days1);

  return new Date(days * one_day);
}

export function randomString(length) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  var result = '';
  for (var i = 0; i < length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    result += chars.substring(rnum, rnum + 1);
  }
  return result;
}
