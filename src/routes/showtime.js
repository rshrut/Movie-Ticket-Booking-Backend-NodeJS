import express from 'express';
import { getShowtimesByMovie, getAllTheatres } from '../controllers/showtime.js';

const router = express.Router();

router.get('/movie/:movieId', getShowtimesByMovie);
router.get('/theatres', getAllTheatres);

export default router;