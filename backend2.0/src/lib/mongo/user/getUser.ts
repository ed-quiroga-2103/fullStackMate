import { Collection } from 'mongodb';

const getUser = async (params, collection: Collection) => {
    const user = await collection.findOne(params);
    return user;
};

export default getUser;
