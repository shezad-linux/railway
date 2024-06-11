import express from 'express';
import { getTicketDetails, getTrainSchedule} from '../controllers/infoController.js';

const router = express.Router();

router.get('/ticket-details/:ticketNumber', getTicketDetails);
router.get('/train-schedule/:trainId', getTrainSchedule);

export default router;
