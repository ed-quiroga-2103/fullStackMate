import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../../.env' });

const config = {
    DATABASE_URI: process.env.DATABASE_URI,
};

export default config;
