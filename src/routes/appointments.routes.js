import AppointmentsModel from '../models/appointments.model';
import express from 'express';

let router = express.Router();

// GET
router.get('/appointments', (req, res) => {
  if (!req.query.appointmentId) {
    return res.status(400).send('Missing URL parameter: appointmentId');
  }

  AppointmentsModel.findOne({
    appointmentId: req.query.appointmentId
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

export default router;
