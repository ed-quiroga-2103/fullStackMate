import { Collection } from 'mongodb';
import { User } from '../../../types';
import getUser from './getUser';

const insertUser = async (params: User, collection: Collection) => {
    const exists = await getUser({ email: params.email }, collection);

    if (exists !== undefined && exists !== null) {
        return undefined;
    }

    const user = await collection.insertOne(params);
    return user;
};

export default insertUser;
