const express = require('express');
const { createEvent,uploadImage } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Allow Organizer and Attendee to create events
router.post('/', authMiddleware(['Organizer', 'Attendee']), createEvent);
router.post('/:id/image', authMiddleware(['Organizer']), uploadImage);
module.exports = router;