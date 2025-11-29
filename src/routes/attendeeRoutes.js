const express = require('express');
const { registerAttendee } = require('../controllers/attendeeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Allow Attendee to register for events
router.post('/', authMiddleware(['Attendee']), registerAttendee);

module.exports = router;