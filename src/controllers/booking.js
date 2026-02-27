import * as bookingService from '../services/booking.js';

export const getUserBookings = async (req, res) => {
    try {
        const userBookings = await bookingService.fetchUserBookings(req.user.id);

        // Mapping exactly like your Java map.put() logic
        const response = userBookings.map(booking => ({
            bookingId: booking.id,
            movieTitle: booking.showtime.movie.title,
            moviePoster: booking.showtime.movie.posterUrl,
            theatreName: booking.showtime.theatre.name,
            showtime: booking.showtime.startTime,
            seats: booking.seatsBooked,
            totalAmount: booking.totalPrice,
            status: booking.status,
            bookingDate: booking.createdAt,
            confirmationCode: "TKT-" + booking.id
        }));

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOccupiedSeats = async (req, res) => {
    try {
        const seats = await bookingService.fetchOccupiedSeats(req.params.showtimeId);
        res.json(seats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBooking = async (req, res) => {
    try {
        const booking = await bookingService.processNewBooking(req.user.id, req.body);

        res.status(201).json({
            bookingId: booking.id,
            confirmationCode: `TKT-${booking.id}`,
            status: booking.status
        });
    } catch (error) {
        const status = error.message.includes('already booked') ? 409 : 400;
        res.status(status).json({ status: "FAILED", message: error.message });
    }
};

export const getBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingService.fetchBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json(booking);
    } catch (error) {
        const status = error.message.includes('already booked') ? 409 : 400;
        res.status(status).json({ status: "FAILED", message: error.message });
    }
};