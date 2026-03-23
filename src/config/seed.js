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
                { title: "Interstellar", posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6vCU67oQzUDXZ.jpg", genre: "Sci-Fi, Drama", rating: 8.7, price: 250, city: "Bangalore", duration: 169 },
                { title: "Spider-Man: Across the Spider-Verse", posterUrl: "https://image.tmdb.org/t/p/w500/8VtB9m91Sj9jlyaspXv6Bpz6v0L.jpg", genre: "Animation, Action", rating: 8.9, price: 180, city: "Mumbai", duration: 140 },
                { title: "Oppenheimer", posterUrl: "https://image.tmdb.org/t/p/w500/8GxvynZTMBLDxWngZzkQ4nzmCcO.jpg", genre: "Drama, History", rating: 8.4, price: 300, city: "Bangalore", duration: 180 },
                { title: "The Matrix", posterUrl: "https://image.tmdb.org/t/p/w500/f89U3Y9L9UnfAy6mS7nZSRRJuY2.jpg", genre: "Action, Sci-Fi", rating: 8.7, price: 200, city: "Delhi", duration: 136 },
                { title: "Parasite", posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTj0CcI2aMv69P9qUE39ZJpZ.jpg", genre: "Thriller, Drama", rating: 8.5, price: 180, city: "Bangalore", duration: 132 },
                { title: "Dune: Part Two", posterUrl: "https://image.tmdb.org/t/p/w500/6MKs3vqzp79pW9iYnNEpQ6O6PRO.jpg", genre: "Sci-Fi, Adventure", rating: 9.0, price: 350, city: "Mumbai", duration: 166 },
                { title: "The Lion King", posterUrl: "https://image.tmdb.org/t/p/w500/sKCrzHcS1RvmZ90C4zt65vRFS9p.jpg", genre: "Animation, Drama", rating: 8.5, price: 150, city: "Bangalore", duration: 118 },
                { title: "Joker", posterUrl: "https://image.tmdb.org/t/p/w500/udDcl70jRiiOfV69snWSRSj9Hn6.jpg", genre: "Crime, Thriller", rating: 8.4, price: 220, city: "Delhi", duration: 122 },
                { title: "Pulp Fiction", posterUrl: "https://image.tmdb.org/t/p/w500/d5iIl9h9btztp9qxcc67G9Zki0U.jpg", genre: "Crime, Drama", rating: 8.9, price: 190, city: "Bangalore", duration: 154 },
                { title: "The Prestige", posterUrl: "https://image.tmdb.org/t/p/w500/bdN3g8E5pS78TjaQ6vInclPJ9Yn.jpg", genre: "Drama, Mystery", rating: 8.5, price: 210, city: "Mumbai", duration: 130 }
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