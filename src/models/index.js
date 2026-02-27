import { sequelize } from '../config/db.js';
import Movie from './Movie.js';
import User from './AppUser.js';
import Theatre from './Theatre.js';
import Showtime from './Showtime.js';
import Booking from './Booking.js';


Movie.hasMany(Showtime, { foreignKey: 'movieId', as: 'showtimes' });
Showtime.belongsTo(Movie, { foreignKey: 'movieId', as: 'movie' });

Theatre.hasMany(Showtime, { foreignKey: 'theatreId', as: 'showtimes' });
Showtime.belongsTo(Theatre, { foreignKey: 'theatreId', as: 'theatre' });

Showtime.hasMany(Booking, { foreignKey: 'showtimeId' ,as: 'bookings'});
Booking.belongsTo(Showtime, { foreignKey: 'showtimeId', as: 'showtime' });

User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
    sequelize,
    Movie,
    User,
    Theatre,
    Showtime,
    Booking
};
