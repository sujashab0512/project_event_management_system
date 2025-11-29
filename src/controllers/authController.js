const bcrypt = require('bcryptjs'); // Using bcryptjs for simplicity
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: User not found (${email})`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // ✅ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Password mismatch for ${email}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`Login successful: ${email}`);
    res.json({ success: true, token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};
