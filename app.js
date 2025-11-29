const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/config/logger');
const fileUpload = require('express-fileupload');
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const attendeeRoutes = require('./src/routes/attendeeRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/attendees', attendeeRoutes);

// Error Handler
app.use(errorHandler);

// Log app start
logger.info('App initialized');

module.exports = app;