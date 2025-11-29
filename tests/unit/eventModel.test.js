require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../../src/models/Event');

describe('Event Model Validation', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should require title, date, and location', () => {
    const event = new Event({});
    const validationError = event.validateSync();

    expect(validationError.errors['title']).toBeDefined();
    expect(validationError.errors['date']).toBeDefined();
    expect(validationError.errors['location']).toBeDefined();
  });
});