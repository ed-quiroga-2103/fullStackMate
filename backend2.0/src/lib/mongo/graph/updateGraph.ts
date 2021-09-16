import { Collection } from 'mongodb';
import getGraph from './getGraph';

const updateGraph = async (params, collection: Collection) => {
    const exists = await getGraph({ id: params.where.id }, collection);

    if (exists === undefined || exists === null) {
        return undefined;
    }

    const graph = await collection.updateOne(params.where, {
        $set: params.data,
    });
    return graph;
};

export default updateGraph;
