import mongoose from 'mongoose';
import helmet from 'helmet';
import nosniff from 'dont-sniff-mimetype';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import locationsRoutes from './routes/locations.routes';
import appointmentsRoutes from './routes/appointments.routes';
import path from 'path';
import bodyParser from 'body-parser';
require('dotenv').config();

const mongoUser = process.env.MONGO_USER || '';
const mongoPassword = process.env.MONGO_PASSWORD || '';
const mongoURI = process.env.MONGO_URI;
const mongoPort = process.env.MONGO_PORT;
const mongoDB = process.env.MONGO_DATABASE;
// in cases where we are connection to mongo Atlas, it may be earier to just use a connection string
let mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

if (
  typeof mongoConnectionString === undefined ||
  mongoConnectionString.length < 1
) {
  // Connection string doesnt exist as an environment variable
  mongoConnectionString = `mongodb://${mongoUser}:${mongoPassword}@${mongoURI}:${mongoPort}/${mongoDB}`;
}

let app = express();
console.log(mongoConnectionString);

mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

mongoose.connection
  .once('open', () => {
    console.log('connection has been made');
  })
  .on('error', error => {
    console.log(`Connection error: ${error}`);
  });

// Helmet options for production environment
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.disable('x-powered-by');
  app.use(nosniff());
}

// Parser for request handlers
app.use(bodyParser.json());

// Logging for request details
process.env.NODE_ENV === 'development'
  ? app.use(morgan('dev'))
  : app.use(morgan('combined'));

// Enable CORS for all requests
app.use(cors());
app.options('*', cors());

// Routes or route modules for the app to use
app.use(locationsRoutes);
app.use(appointmentsRoutes);

//handler for 404 - resources not found
app.use((req, res) => {
  res.status(404).send('we think you are lost');
});

// Handler for Error 500
app.use((err, req, res) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, '../public/500.html'));
});

// Server port
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
