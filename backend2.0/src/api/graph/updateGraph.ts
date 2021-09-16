import { Response, Request } from 'express';
import { Graph } from '../../types';
import mongoLib from '../../lib/mongo';

const updateGraph = async (req: Request, res: Response) => {
    const params = req.body;
    const response = await mongoLib.graph.updateGraph(params).catch((error) => {
        res.status(500);
        res.send({ message: error.message });
        return;
    });

    res.send({ response });
};

export default updateGraph;
