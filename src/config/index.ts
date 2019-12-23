import dotenv from 'dotenv';

// Set the NODE_ENV to development by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = dotenv.config();

if (!envFile) {
    throw new Error("Couldn't find .env file️");
}

export default {
    port: parseInt(process.env.PORT, 10),
};
