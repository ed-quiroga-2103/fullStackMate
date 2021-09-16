import { Collection } from 'mongodb';

const getGraph = async (params, collection: Collection) => {
    const graph = await collection.findOne(params);
    return graph;
};

export default getGraph;
