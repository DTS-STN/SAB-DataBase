import AppointmentsModel from '../models/appointments.model';
import express from 'express';

let router = express.Router();

// GET an appointment with it's BIL field
/*
TODO: Add in the query a check that the returned appointment must be a current
appointment, and not from the past? Users will have multiple appointments that will fit the 
current query otherwise
 */
router.get('/appointments/:bil', (req, res) => {
  AppointmentsModel.findOne({
    bil: req.params.bil,
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
