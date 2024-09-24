const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  flightId: { type: String, required: true },
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departureTime: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        console.log('Validating departureTime:', value);
        if (!(value instanceof Date) || isNaN(value)) {
          console.log('Invalid date object');
          return false;
        }
        const now = new Date();
        if (value <= now) {
          console.log('Date is not in the future');
          return false;
        }
        return true;
      },
      message: props => {
        if (!(props.value instanceof Date) || isNaN(props.value)) {
          return `${props.value} is not a valid date.`;
        }
        if (props.value <= new Date()) {
          return `Departure time must be in the future. Given: ${props.value}`;
        }
        return 'Invalid departure time.';
      }
    }
  },
  origin: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;