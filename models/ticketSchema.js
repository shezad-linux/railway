import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
 
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
  },
  passengerName: {
    type: String,
    required: true,
  },
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
