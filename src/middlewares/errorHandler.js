const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ success: false, message: err.message });
};