import express from 'express';
import { bookTicket, cancelTicket } from '../controllers/bookingController.js'
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();



router.post('/book-ticket',isAuthenticated, bookTicket);
router.delete('/cancel-ticket',isAuthenticated, cancelTicket);

export default router;
