import { MongoClient } from 'mongodb';
import config from '../lib/config/config';

class MongoDB {
    connect = () => {
        return new MongoClient(config.DATABASE_URI);
    };
}

const db = new MongoDB().connect();

export default db;
