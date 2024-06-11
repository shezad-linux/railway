import { Train } from '../models/trainschema.js';

export const createTrain = async (req, res) => {
  try {
    // Check if required fields are provided in the request body
    const { trainId, trainNumber, departureStation, arrivalStation, departureTime, arrivalTime, totalSeats, availableSeats, fare } = req.body;
    if (!trainId || !trainNumber || !departureStation || !arrivalStation || !departureTime || !arrivalTime || !totalSeats || !availableSeats || !fare) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    // Check if the trainId is already taken
    const existingTrain = await Train.findOne({ trainId });
    if (existingTrain) {
      return res.status(400).json({ success: false, message: 'TrainId is already taken' });
    }

    // Create the new train
    const newTrain = await Train.create({
      trainId,
      trainNumber,
      departureStation,
      arrivalStation,
      departureTime,
      arrivalTime,
      totalSeats,
      availableSeats,
      fare,
    });

    res.status(201).json({ success: true, data: newTrain });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
