import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
 trainId:{
    type:String,
    require:true,
    unique:true,
    maxlength: 10,

 },
  trainNumber: {
    type: String,
    required: true,
    unique: true,
  },
  departureStation: {
    type: String,
    required: true,
  },
  arrivalStation: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
});

export const Train = mongoose.model('Train', trainSchema);
