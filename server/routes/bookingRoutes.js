const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', async (req, res) => {
  console.log('Received booking request:', req.body);
  try {
    // Parse the departureTime to ensure it's a valid Date object
    if (req.body.departureTime) {
      const parsedDate = new Date(req.body.departureTime);
      console.log('Parsed departureTime:', parsedDate);
      if (isNaN(parsedDate)) {
        throw new Error('Invalid departure time format');
      }
      req.body.departureTime = parsedDate;
    }

    const booking = new Booking(req.body);
    console.log('Created booking object:', booking);
    await booking.save();
    console.log('Booking saved successfully');
    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    if (error.name === 'ValidationError') {
      console.log('Validation error details:', error.errors);
      const errorMessages = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ message: 'Invalid booking data', errors: errorMessages });
    } else if (error.message === 'Invalid departure time format') {
      res.status(400).json({ message: 'Invalid booking data', errors: [error.message] });
    } else {
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  }
});

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;