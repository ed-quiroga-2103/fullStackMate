import { MongoClient } from 'mongodb';

const uri =
    'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const MongoDB = new MongoClient(uri);

export default MongoDB;
