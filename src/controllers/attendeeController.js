const Attendee = require('../models/Attendee');
const Event = require('../models/Event');
const User = require('../models/User');
const logger = require('../config/logger');

exports.registerAttendee = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user) {
      logger.warn(`Attendee registration failed: User not found (${userId})`);
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!event) {
      logger.warn(`Attendee registration failed: Event not found (${eventId})`);
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const attendee = await Attendee.create({ user: userId, event: eventId });
    logger.info(`Attendee registered: User ${userId} for Event ${eventId}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: attendee
    });
  } catch (error) {
    logger.error(`Attendee registration error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};