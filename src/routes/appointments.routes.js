import AppointmentsModel from '../models/appointments.model';
import moment from 'moment';
import express from 'express';

let router = express.Router();

// GET a current (not in the past) appointment with it's BIL field
router.get('/appointments/:bil', (req, res) => {
  let now = moment().toDate();
  console.log(now);
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
