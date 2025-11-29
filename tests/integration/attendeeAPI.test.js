require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app'); // Your Express app

describe('POST /api/v1/attendees', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register attendee successfully', async () => {
    // Sample attendee data
    const attendeeData = {
      userId: '692b30438a0114de93ca7073', // Replace with a valid user ID from your DB
      eventId: '692b306a8a0114de93ca7076', // Replace with a valid event ID from your DB
    };

    const res = await request(app)
      .post('/api/v1/attendees')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmIzMDQzOGEwMTE0ZGU5M2NhNzA3MyIsInJvbGUiOiJBdHRlbmRlZSIsImlhdCI6MTc2NDQzODA5OSwiZXhwIjoxNzY0NDQxNjk5fQ.0sZDohltEgUaeFsfoP2xvfNvmthloaTmy5LRkIap93k') // Replace with a valid JWT
      .send(attendeeData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.user).toBe(attendeeData.userId);
    expect(res.body.data.event).toBe(attendeeData.eventId);
  });
});
