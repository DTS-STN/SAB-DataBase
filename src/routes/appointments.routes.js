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

//post

router.post('/appointments', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }
  //json format to test on postman and issomonia
  // {
  //     "locationId" : "hello1234",
  //         "locationAddress" : "jotaru@kujo.com",
  //             "cic" : "ab123456789",
  //                 "date" : "2019-09-21",
  // }

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
