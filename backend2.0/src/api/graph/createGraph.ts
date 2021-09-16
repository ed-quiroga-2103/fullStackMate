import { Response, Request } from 'express';
import { Graph } from '../../types';
import mongoLib from '../../lib/mongo';

const createGraph = async (req: Request, res: Response) => {
    const graph: Graph = req.body;
    const response = await mongoLib.graph.insertGraph(graph).catch((error) => {
        res.status(500);
        res.send({ message: error.message });
    });

    res.send({ response });
};

export default createGraph;
