import { Ticket } from '../models/ticketSchema.js'
import { Train } from '../models/trainschema.js'


// Controller method to get ticket details
export const getTicketDetails = async (req, res) => {
  try {
    // Logic to fetch ticket details
    const ticketNumber = req.params.ticketNumber;
    console.log(ticketNumber)
    const ticket = await Ticket.findOne({ ticketNumber });
    
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Controller method to get train schedule
export const getTrainSchedule = async (req, res) => {
  try {
    // Logic to fetch train schedule
    const trainId = req.params.trainId;
    const train = await Train.findById(trainId);
    res.status(200).json({ success: true, data: train });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Controller method to get station information

