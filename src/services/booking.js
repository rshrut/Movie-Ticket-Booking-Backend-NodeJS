import { Booking, Showtime, Movie, Theatre, User, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

export const fetchOccupiedSeats = async (showtimeId) => {
    const bookings = await Booking.findAll({
        where: { showtimeId },
        attributes: ['seatsBooked']
    });

    const occupied = new Set();
    bookings.forEach(b => {
        b.seatsBooked.split(',').forEach(seat => occupied.add(seat.trim().toUpperCase()));
    });
    return Array.from(occupied);
};

export const fetchUserBookings = async (userId) => {
    console.log('uoid', userId);

    return await Booking.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        include: [{
            model: Showtime,
            as: 'showtime',
            include: [
                {
                    model: Movie,
                    as: 'movie'
                }, 
                {
                    model: Theatre,
                    as: 'theatre'
                }
            ]
        }]
    });
};

export const fetchBookingById = async (id) => {
    return await Booking.findByPk(id, {
        include: [
            {
                model: Showtime,
                as: 'showtime',
                include: [
                    { 
                        model: Movie, 
                        as: 'movie' 
                    },
                    { 
                        model: Theatre, 
                        as: 'theatre' 
                    }
                ]
            }
        ]
    });
};

export const processNewBooking = async (userId, bookingData) => {
    const { showtimeId, seatNumbers, totalAmount } = bookingData;

    // Managed Transaction: Everything inside must succeed or it rolls back
    return await sequelize.transaction(async (t) => {
        const showtime = await Showtime.findByPk(showtimeId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!showtime) throw new Error("Showtime not found");

        const requestedSeats = seatNumbers.toUpperCase().split(',');
        const requestedCount = requestedSeats.length;

        const availableSeatsCount = showtime.totalSeats - showtime.seatsBooked;

        // 1. Check total capacity
        if (availableSeatsCount < requestedCount) {
            throw new Error("Insufficient seats available.");
        }

        // 2. Check specific seat conflicts
        const occupied = await fetchOccupiedSeats(showtimeId);
        for (let seat of requestedSeats) {
            if (occupied.includes(seat.trim())) {
                throw new Error(`Seat ${seat} is already booked.`);
            }
        }

        // 3. Save Booking
        const booking = await Booking.create({
            showtimeId,
            userId,
            seatsBooked: seatNumbers.toUpperCase(),
            totalPrice: totalAmount,
            status: 'CONFIRMED'
        }, { transaction: t });

        // 4. Update Showtime Count
        await showtime.update({
            seatsBooked: showtime.seatsBooked + requestedCount
        }, { transaction: t });

        return booking;
    });
};