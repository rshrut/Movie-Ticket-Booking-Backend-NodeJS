import { Showtime, Theatre, Movie } from '../models/index.js';

export const fetchByMovieId = async (movieId) => {
    return await Showtime.findAll({
        where: { movieId },
        include: [
            {
                model: Theatre,
                as:'theatre',
                attributes: ['id','name', 'city']
            },
            {
                model: Movie,
                as:'movie',
                attributes: ['id','title', 'price']
            }
        ]
    });
};

export const fetchAllTheatres = async () => {
    return await Theatre.findAll();
};