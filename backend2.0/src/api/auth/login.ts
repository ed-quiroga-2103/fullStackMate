import { Response, Request } from 'express';
import mongoLib from '../../lib/mongo';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
    // Update after new database
    const params = {
        user: req.body.username,
        pass: req.body.password,
    };

    const user = await mongoLib.getUser(params).catch(() => {
        res.status(500);
        res.send({ message: 'Oops! Unexpected error on login' });
    });

    const token = jwt.sign({ user }, '123456', {
        expiresIn: '2h',
    });

    const refreshToken = jwt.sign({ user }, '456123', {
        expiresIn: '96h',
    });

    res.status(200);
    res.send({ token, refreshToken });
};

export default login;
