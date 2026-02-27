import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

// Check if we are in production/Render or local
export const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Required for Neon/Render
        }
      }
    })
  : new Sequelize(
      process.env.DB_NAME, 
      process.env.DB_USER, 
      process.env.DB_PASSWORD, 
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT
      }
    );

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connected via Sequelize...');
    } catch (err) {
        console.error('❌ Database connection error:', err.message);
        process.exit(1);
    }
};