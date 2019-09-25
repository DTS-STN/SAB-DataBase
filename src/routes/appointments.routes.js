import AppointmentsModel from '../models/appointments.model';
import moment from 'moment';
import express from 'express';
import locationModel from '../models/location.model';

let router = express.Router();

// TODO: Create endpoint for cancelling appointments

// GET appointments for a given location for a given day
// or month. Days and months are passed as query strings
router.get('/appointments/:locationId', (req, res) => {
  let day = req.query.day;
  let month = req.query.month;
  if (day) {
    day = moment(day, 'YYYY-MM-DD');
    AppointmentsModel.find({
      locationId: req.params.locationId,
      date: {
        $gte: day.startOf('day').toDate(),
        $lte: day.endOf('day').toDate()
      }
    })
      .then(docs => {
        res.json(docs);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else if (month) {
    let startDate = moment()
      .month(month)
      .startOf('month')
      .toDate();
    let endDate = moment()
      .month(month)
      .endOf('month')
      .toDate();
    AppointmentsModel.find({
      locationId: req.params.locationId,
      date: {
        $gte: startDate,
        $lte: endDate
      },
      cancelledByClient: false,
      cancelledByLocation: false
    })
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    let now = moment().toDate();
    AppointmentsModel.find({
      locationId: req.params.locationId,
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
  }
});

// GET available timeslots for a location on a given day
router.get('/appointments/timeslots/:locationId', (req, res) => {
  let day = req.query.day;
  locationModel
    .findOne({
      locationId: req.params.locationId
    })
    .then(loc => {
      day = moment(day, 'YYYY-MM-DD');
      let hours = loc.hours.split('-');
      let start = hours[0];
      let end = hours[1];
      let timeSlots = getTimeStops(start, end);

      AppointmentsModel.find({
        locationId: req.params.locationId,
        date: {
          $gte: day.startOf('day').toDate(),
          $lte: day.endOf('day').toDate()
        }
      })
        .then(appointments => {
          for (let i = 0; i < timeSlots.length; i++) {
            for (let j = 0; j < appointments.length; j++) {
              let appointmentCount = 0;
              let bioKitCount = loc.bioKitAmount;
              let appointmentSlot = moment(appointments[`${j}`].date)
                .utc()
                .format('hh:mm a');
              console.log(appointmentSlot);
              if (timeSlots[`${i}`].value === appointmentSlot) {
                appointmentCount++;
                if (appointmentCount === bioKitCount) {
                  timeSlots.splice(i, 1);
                }
              }
            }
          }
          return timeSlots;
        })
        .then(availTimeSlots => {
          res.json(availTimeSlots);
        })
        .catch(err => {
          res.status(500).json(err.message);
        });
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
  model.confirmation = null;
  model.maintenance = false;
  model.cancelledByClient = false;
  model.cancelledByLocation = false;
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
router.put('/appointments/confirm/:documentId', (req, res) => {
  // Get temporary appointment document
  AppointmentsModel.findById(req.params.documentId).then(doc => {
    // Remove expiry and change to confirmed appointment
    if (doc.dateConfirmed !== null) {
      return res.status(400).send('Appointment has already been confirmed');
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
    timeStops.push({
      value: moment(startTime).format('hh:mm a'),
      name: moment(startTime).format('hh:mm a')
    });
    startTime.add(15, 'minutes');
  }

  return timeStops;
};

export default router;
