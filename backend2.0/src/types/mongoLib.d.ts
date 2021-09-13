import { Collection } from 'mongodb';
import { Response, Request } from 'express';

export interface UserMongoParams {
    req: Request;
    res: Response;
    collection: Collection;
}
