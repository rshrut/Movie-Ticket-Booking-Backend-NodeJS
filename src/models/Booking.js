import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    seatsBooked: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('CONFIRMED', 'PENDING', 'CANCELLED'),
        defaultValue: 'PENDING'
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'appUsers',
            key: 'id'
        }
    },
    showtimeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'showtimes',
            key: 'id'
        }
    }
}, { 
    tableName: 'bookings',
    indexes: [
        {
            fields: ['userId']
        },
        {
            fields: ['showtimeId']
        },
        {
            fields: ['showtimeId', 'status']
        }
    ] 
});

export default Booking;