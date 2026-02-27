import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movie.js'
import showtimeRoutes from './routes/showtime.js'
import bookingRoutes from './routes/booking.js'
import { seedDatabase } from './config/seed.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/movies', movieRoutes);

app.use('/api/v1/showtimes', showtimeRoutes);

app.use('/api/v1/bookings', bookingRoutes);


app.get('/health', (req, res) => {
    res.json({ status: "success", message: "Server is healthy" });
});

const startServer = async () => {
    try {
        // First, authenticate the connection
        await connectDB();

        // Second, Sync models to create tables in DBeaver
        // { alter: true } updates tables if you change your model code
        await sequelize.sync({ alter: true });
        console.log('✅ Database & Tables synced successfully');
        await seedDatabase();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1); // Stop the app if DB connection fails
    }
};

startServer();