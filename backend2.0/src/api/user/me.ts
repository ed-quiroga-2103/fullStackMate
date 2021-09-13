import { Response, Request } from 'express';

const me = (req: Request, res: Response) => {
    res.send({ name: 'Eduardo' });
};

export default me;
