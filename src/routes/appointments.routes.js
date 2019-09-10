import AppointmentsModel from '../models/appointments.model';
import moment from 'moment';
import express from 'express';

let router = express.Router();

// TODO: Create API for fetching set of appointments for a given location, on a given day
// TODO: Create endpoint for cancelling appointments

// GET appointments for a given location for a given day
// day parameter is passed in the format "MM-DD-YYYY"
router.get('/appointments/:locationId/:day', (req, res) => {
  let day = moment(req.params.day, 'DD-MM-YYYY');
  console.log(day);
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
});

// GET all appointments in the future for a given location
router.get('/appointmentsByLocId/:locationId', (req, res) => {
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
});

// GET a current (not in the past) appointment with it's BIL field
router.get('/appointments/:bil', (req, res) => {
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

// GET appointments for a month date range for a specific location that have not been cancelled
router.get('/appointments/:locationId/:month', (req, res) => {
  let startDate = moment()
    .month(req.params.month)
    .startOf('month')
    .toDate();
  let endDate = moment()
    .month(req.params.month)
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
});

// POST for creating a new appointment
router.post('/appointments', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  let model = new AppointmentsModel(req.body);
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

export default router;
