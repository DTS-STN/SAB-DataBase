import AppointmentsModel from '../models/appointments.model';
// eslint-disable-next-line no-unused-vars
import moment from 'moment';
import express from 'express';
import locationModel from '../models/location.model';
import mongoose from 'mongoose';

let router = express.Router();

function respondToFind(res, err, errMsg, object) {
  if (err) {
    res.status(errMsg.code).send({ error: err, message: errMsg.msg });
  } else {
    res
      .status(200)
      .type('application/json')
      .send(object);
  }
}

const couldNotGetAppointments = {
  code: 403,
  msg: 'Could not get appointments'
};

// const couldNotGetTimeslots = {
//   code: 403,
//   msg: 'Could not get timeslots'
// };

// GET appointments for a given location for a given day
// or month. Days and months are passed as query strings
router.get('/appointments/:locationId', (req, res) => {
  let day = req.query.day;
  let month = req.query.month;
  let fromDate = req.query.from;
  let to = req.query.to;

  if (day) {
    day = moment(day, 'YYYY-MM-DD');
    AppointmentsModel.find(
      {
        locationId: req.params.locationId,
        date: {
          $gte: day.startOf('day').toDate(),
          $lte: day.endOf('day').toDate()
        }
      },
      (err, appointmentsDocs) => {
        respondToFind(res, err, couldNotGetAppointments, appointmentsDocs);
      }
    );
  } else if (month) {
    let startDate = moment()
      .month(month)
      .startOf('month')
      .toDate();
    let endDate = moment()
      .month(month)
      .endOf('month')
      .toDate();
    AppointmentsModel.find(
      {
        locationId: req.params.locationId,
        date: {
          $gte: startDate,
          $lte: endDate
        },
        cancelledByClient: false,
        cancelledByLocation: false
      },
      (err, appointmentsDocs) => {
        respondToFind(res, err, couldNotGetAppointments, appointmentsDocs);
      }
    );
  } else if (fromDate) {
    fromDate = moment(fromDate, 'DD-MM-YYYY');
    to = moment(to, 'DD-MM-YYYY');
    AppointmentsModel.find(
      {
        locationId: req.params.locationId,
        date: {
          $gte: fromDate.startOf('day').toDate(),
          $lte: to.endOf('day').toDate()
        }
      },
      (err, appointmentsDocs) => {
        respondToFind(res, err, couldNotGetAppointments, appointmentsDocs);
      }
    );
  } else {
    let now = moment().toDate();
    AppointmentsModel.find(
      {
        locationId: req.params.locationId,
        date: {
          $gte: now
        }
      },
      (err, appointmentsDocs) => {
        respondToFind(res, err, couldNotGetAppointments, appointmentsDocs);
      }
    );
  }
});

// GET available timeslots for a location on a given day
router.get('/appointments/timeslots/:locationId', (req, res) => {
  let accessible = req.query.accessible;
  let day = req.query.day;
  if (!day) {
    res.status(500).json('Day parameter is missing');
  }
  locationModel
    .findOne({
      locationId: req.params.locationId
    })
    .then(loc => {
      if (!loc) {
        res.status(403).json('Error: Location does not exist');
      }
      day = moment(day, 'YYYY-MM-DD').utc();
      const bioKitCount = loc.bioKitCount;
      const accessibleBioKitCount = loc.bioKits.filter(
        bioKit => bioKit.accessible && bioKit.private === true
      ).length;
      const hours = loc.hours.split('-');
      const start = hours[0];
      const end = hours[1];
      let timeSlots = getTimeStops(start, end);

      AppointmentsModel.find({
        locationId: req.params.locationId,
        date: {
          $gte: day.startOf('day').toDate(),
          $lte: day.endOf('day').toDate()
        }
      })
        .then(appointments => {
          if (accessible && accessible === 'true') {
            const accessibleAppointments = appointments.filter(a => {
              return a.privateAccessible === true;
            });
            const appointmentCounts = mapToTimeslots(accessibleAppointments);
            const fullTimeSlots = mapFullTimeslots(
              appointmentCounts,
              accessibleBioKitCount
            );
            return timeSlots.filter(ts => !fullTimeSlots.includes(ts.value));
          }
          const appointmentCounts = mapToTimeslots(appointments);
          const fullTimeSlots = mapFullTimeslots(
            appointmentCounts,
            bioKitCount
          );
          //return all the timeslots that aren't in the list of fullAppointments
          return timeSlots.filter(ts => !fullTimeSlots.includes(ts.value));
        })
        .then(timeSlots => {
          res.status(200).json(timeSlots);
        })
        .catch(err => {
          res.status(500).json(`Error:` + err.message);
        });
    })
    .catch(err => {
      res.status(500).json(`Could not retrieve timeslots: ${err}`);
    });
});

// GET a current (not in the past) appointment with it's BIL field
router.get('/appointments/bil/:bil', (req, res) => {
  let now = moment().toDate();
  AppointmentsModel.findOne({
    bil: req.params.bil,
    date: {
      $gte: now
    }
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST for creating a new temporary appointment
router.post('/appointments/temp', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }
  let model = new AppointmentsModel(req.body);
  model._id = mongoose.Types.ObjectId();
  model.confirmation = null;
  model.maintenance = false;
  model.cancelledByClient = false;
  model.cancelledByLocation = false;
  model.dateConfirmed = null;
  model.expires = moment()
    .add(5, 'minutes')
    .toDate();
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST for creating a new confirmed appointment
router.get('/appointments/confirm/:documentId', (req, res) => {
  // Get temporary appointment document
  AppointmentsModel.findById(req.params.documentId).then(doc => {
    // Remove expiry and change to confirmed appointment
    if (doc.dateConfirmed !== null) {
      return res.status(400).send(doc);
    }
    doc.confirmation = hashFromData(doc.clientEmail, doc.bil);
    doc.expires = null;
    doc.dateConfirmed = new Date();
    doc
      .save()
      .then(doc => {
        if (!doc || doc.length === 0) {
          return res.status(500).send(doc);
        }
        res.status(201).send(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
});

const hashFromData = (email, paperFileNumber) => {
  var hash = 0,
    i,
    chr;
  const keys = email + paperFileNumber;
  if (keys.length === 0) return hash;
  for (i = 0; i < keys.length; i++) {
    chr = keys.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

const getTimeStops = (start, end) => {
  var startTime = moment(start, 'hh:mm');
  var endTime = moment(end, 'hh:mm');

  if (endTime.isBefore(startTime)) {
    endTime.add(1, 'day');
  }

  var timeStops = [];

  while (startTime <= endTime) {
    const timeStop = moment(startTime).format('hh:mm a');
    timeStops.push({
      value: timeStop,
      name: timeStop
    });
    startTime.add(15, 'minutes');
  }

  return timeStops;
};

const mapToTimeslots = appointments => {
  return appointments
    .map(a =>
      moment(a.date)
        .utc()
        .format('hh:mm a')
    )
    .reduce((acc, curr) => {
      acc[`${curr}`] = (acc[`${curr}`] || 0) + 1;
      return acc;
    }, {});
};

const mapFullTimeslots = (object, bioKitCount) => {
  return Object.keys(object).filter(ac => object[`${ac}`] >= bioKitCount);
};

export default router;
