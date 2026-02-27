import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Showtime = sequelize.define('Showtime', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE
    },
    seatsBooked: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    totalSeats: {
        type: DataTypes.INTEGER,
        defaultValue: 100
    },
    movieId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'movies', 
            key: 'id'       
        }
    },
    theatreId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'theatres',
            key: 'id'
        }
    }
}, { 
    tableName: 'showtimes',
    indexes: [
        {
            fields: ['movieId']
        },
        {
            fields: ['theatreId']
        },
        {
            fields: ['movieId', 'startTime']
        }
    ] 
});

export default Showtime;