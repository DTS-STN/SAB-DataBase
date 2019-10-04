import AppointmentsModel from '../models/appointments.model';
import moment from 'moment';
import express from 'express';

let router = express.Router();

// TODO: Create endpoint for cancelling appointments

// GET appointments for a given location for a given day
// or month. Days and months are passed as query strings
router.get('/appointments/:locationId', (req, res) => {
  let day = req.query.day;
  let month = req.query.month;
  let from = req.query.from;
  let to = req.query.to;

  if (day) {
    day = moment(day, 'DD-MM-YYYY');
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
  } else if (from) {
    from = moment(from, 'DD-MM-YYYY');
    to = moment(to, 'DD-MM-YYYY');
    AppointmentsModel.find({
      locationId: req.params.locationId,
      date: {
        $gte: from.startOf('day').toDate(),
        $lte: to.endOf('day').toDate()
      }
    })
      .then(docs => {
        res.json(docs);
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
router.put('/appointments/confirm/:documentId', (req, res) => {
  // Get temporary appointment document
  AppointmentsModel.findById(req.params.documentId).then(doc => {
    // Remove expiry and change to confirmed appointment
    console.log(doc.dateConfirmed);
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

export default router;
