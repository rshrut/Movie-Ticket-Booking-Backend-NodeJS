import { Movie } from '../models/index.js';

export const fetchAllMovies = async () => {
    return await Movie.findAll();
};

export const fetchMovieById = async (id) => {
    const movie = await Movie.findByPk(id);
    if (!movie) throw new Error("Movie not found");
    return movie;
};