import express from 'express';
import { createBooking, getUserBookings, getOccupiedSeats, getBooking } from '../controllers/booking.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All booking routes require being logged in
router.use(protect); 

router.post('/', createBooking);
router.get('/user', getUserBookings);
router.get('/:id', getBooking);
router.get('/occupied/:showtimeId', getOccupiedSeats);

export default router;