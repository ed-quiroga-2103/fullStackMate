import { Collection } from 'mongodb';
import { Graph, User } from '../../../types';
import getGraph from './getGraph';

const insertGraph = async (params: Graph, collection: Collection) => {
    const exists = await getGraph({ email: params.id }, collection);

    if (exists !== undefined && exists !== null) {
        return undefined;
    }

    const graph = await collection.insertOne(params);
    return graph;
};

export default insertGraph;
