import express from 'express';
import { createTrain } from '../controllers/addTrain.js';

const router = express.Router();

// Route for creating a new train
router.post('/trains', createTrain);

export default router;
