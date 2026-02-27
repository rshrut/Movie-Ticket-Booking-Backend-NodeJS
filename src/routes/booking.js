import express from 'express';
import { createBooking, getUserBookings, getOccupiedSeats, getBooking } from '../controllers/booking.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/occupied/:showtimeId', getOccupiedSeats);

// All booking routes require being logged in
router.use(protect); 

router.post('/', createBooking);
router.get('/user', getUserBookings);
router.get('/:id', getBooking);

export default router;