import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const poolConfig = {
  max: 5,         // Maximum number of connections in pool
  min: 0,         // Minimum number of connections in pool
  acquire: 30000, // Maximum time (ms) to try to get a connection before error
  idle: 10000     // Maximum time (ms) a connection can be idle before being released
};

// Check if we are in production/Render or local
export const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Required for Neon/Render
        }
      },
      pool: poolConfig
    })
  : new Sequelize(
      process.env.DB_NAME, 
      process.env.DB_USER, 
      process.env.DB_PASSWORD, 
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        pool: poolConfig
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