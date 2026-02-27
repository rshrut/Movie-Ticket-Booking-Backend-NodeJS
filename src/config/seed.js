import bcrypt from 'bcryptjs';
import { User, Movie, Theatre, Showtime } from '../models/index.js';

export const seedDatabase = async () => {
    try {
        // 1. Seed User (Check by email)
        const userExists = await User.findOne({ where: { email: 'test@booking.com' } });
        if (!userExists) {
            const hashedPassword = await bcrypt.hash('password', 10);
            await User.create({
                name: 'Test User',
                email: 'test@booking.com',
                password: hashedPassword,
                role: 'USER'
            });
            console.log("👤 Test user created: test@booking.com / password");
        }

        // 2. Seed Movies (Only if empty)
        const movieCount = await Movie.count();
        if (movieCount === 0) {
            console.log("🎬 Initializing Database with expanded seed data...");

            const movies = await Movie.bulkCreate([
                {
                    title: "Avengers: Endgame",
                    posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                    genre: "Action, Sci-Fi",
                    rating: 8.4,
                    price: 250.0,
                    city: "Bangalore",
                    duration: 181
                },
                {
                    title: "Inception",
                    posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
                    genre: "Sci-Fi, Adventure",
                    rating: 8.8,
                    price: 200.0,
                    city: "Mumbai",
                    duration: 148
                },
                {
                    title: "The Dark Knight",
                    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                    genre: "Action, Crime",
                    rating: 9.0,
                    price: 220.0,
                    city: "Bangalore",
                    duration: 152
                }
            ]);

            // 3. Seed Theatres
            const theatres = await Theatre.bulkCreate([
                { name: "PVR: Forum Mall", address: "Koramangala, Bangalore", city: "Bangalore", seatingCapacity: 150 },
                { name: "INOX: Mantri Square", address: "Malleshwaram, Bangalore", city: "Bangalore", seatingCapacity: 120 },
                { name: "Cinepolis: Royal Meenakshi Mall", address: "Bannerghatta, Bangalore", city: "Bangalore", seatingCapacity: 200 }
            ]);

            // 4. Seed Showtimes
            console.log("⏳ Generating showtimes...");
            
            // Setting "tomorrow" logic like Java LocalDateTime
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setSeconds(0, 0);

            const showtimeData = [];
            
            for (const movie of movies) {
                for (const theatre of theatres) {
                    // Morning (10:30)
                    const morning = new Date(tomorrow);
                    morning.setHours(10, 30);
                    
                    // Evening (18:45)
                    const evening = new Date(tomorrow);
                    evening.setHours(18, 45);

                    // Night (22:15)
                    const night = new Date(tomorrow);
                    night.setHours(22, 15);

                    showtimeData.push(
                        { movieId: movie.id, theatreId: theatre.id, startTime: morning, totalSeats: theatre.seatingCapacity },
                        { movieId: movie.id, theatreId: theatre.id, startTime: evening, totalSeats: theatre.seatingCapacity },
                        { movieId: movie.id, theatreId: theatre.id, startTime: night, totalSeats: theatre.seatingCapacity }
                    );
                }
            }
            
            await Showtime.bulkCreate(showtimeData);
            console.log("✅ Seed data successfully loaded.");
        }
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    }
};