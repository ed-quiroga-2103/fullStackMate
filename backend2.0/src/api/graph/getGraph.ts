import { Response, Request } from 'express';
import { Graph } from '../../types';
import mongoLib from '../../lib/mongo';

const getGraph = async (req: Request, res: Response) => {
    const { id } = req.query;
    const response = await mongoLib.graph.getGraph({ id }).catch((error) => {
        res.status(500);
        res.send({ message: error.message });
    });

    res.send({ response });
};

export default getGraph;
