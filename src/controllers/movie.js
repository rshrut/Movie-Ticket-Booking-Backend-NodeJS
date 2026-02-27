import * as movieService from '../services/movie.js';

export const getAllMovies = async (req, res) => {
    try {
        const movies = await movieService.fetchAllMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await movieService.fetchMovieById(req.params.id);
        res.json(movie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};