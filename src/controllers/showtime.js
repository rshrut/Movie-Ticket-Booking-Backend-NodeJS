import * as showtimeService from '../services/showtime.js';

export const getShowtimesByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const showtimes = await showtimeService.fetchByMovieId(movieId);
        res.json(showtimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTheatres = async (req, res) => {
    try {
        const theatres = await showtimeService.fetchAllTheatres();
        res.json(theatres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};