import { Ticket } from '../models/ticketSchema.js';
import { Train } from '../models/trainschema.js';

// Controller method to book a ticket
export const bookTicket = async (req, res) => {
  try {
    const { passengerName, trainNumber, seatNumber } = req.body;
    if (!passengerName || !trainNumber || !seatNumber) {
      return res.status(400).json({ success: false, message: 'Passenger name, train number, and seat number are required' });
    }

    // Check if the train exists and has available seats
    const train = await Train.findOne({ trainNumber });
    if (!train) {
      return res.status(404).json({ success: false, message: 'Train not found' });
    }
    if (train.availableSeats <= 0) {
      return res.status(400).json({ success: false, message: 'No available seats on this train' });
    }

    // Generate a unique ticket ID (you can use a library or custom logic for this)
    const ticketNumber = generateUniqueTicketID();

    // Create the new ticket
    const newTicket = await Ticket.create({
     
      ticketNumber,
      passengerName,
      trainId: train._id,
      seatNumber,
      bookingStatus: 'confirmed',
    });

    // Update available seats in the train model
    train.availableSeats -= 1;
    await train.save();

    res.status(201).json({ success: true, data: newTicket });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Example function to generate a unique ticket ID (you can implement your own logic here)
const generateUniqueTicketID = () => {
  // Generate a unique ID using a library like UUID or custom logic
  // For example:
  return 'T' + Math.random().toString(36).substr(2, 9);
};
// Other controller functions...

// Controller method to cancel a ticket
export const cancelTicket = async (req, res) => {
  try {
    const { ticketNumber } = req.body; // Assuming the ticket number is provided in the URL params
    
console.log(ticketNumber)
    // Find the ticket by ticketNumber
    const ticket = await Ticket.findOne({ ticketNumber });
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    // Check if the ticket is already cancelled
    if (ticket.bookingStatus === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Ticket is already cancelled' });
    }

    // Update ticket status to cancelled
    ticket.bookingStatus = 'cancelled';
    await ticket.save();

    // Perform additional logic like refunding if applicable

    res.status(200).json({ success: true, message: 'Ticket cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling ticket:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
