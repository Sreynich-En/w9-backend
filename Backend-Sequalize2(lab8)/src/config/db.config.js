import dotenv from 'dotenv';
dotenv.config();

export default {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_NAME || 'school_db',
    PORT: process.env.DB_PORT || 3306,
    dialect: "mysql", 
};
