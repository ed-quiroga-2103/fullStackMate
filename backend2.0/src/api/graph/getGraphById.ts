import { Response, Request } from 'express';
import graphLib from '../../lib/graphs';

const getGraphById = async (req: Request, res: Response) => {
    const graph = await graphLib.getGraph(req.params.id).catch((error) => {});

    if (!graph) {
        res.status(404);
        res.send({
            message: 'No existe un curso con el codigo indicado',
            verbose: 'no graph',
        });
        return;
    }

    res.status(200);
    res.send({ graph });
};

export default getGraphById;