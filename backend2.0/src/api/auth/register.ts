import { Response, Request } from 'express';
import mongoLib from '../../lib/mongo';
import jwt from 'jsonwebtoken';
import { User } from '../../types';

const login = async (req: Request, res: Response) => {
    // Update after new database

    const data: User = req.body;
    const params = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        dni: data.dni,
        lastCourse: data.lastCourse,
        admitionYear: data.admitionYear,
        progress: [],
    };

    const user = await mongoLib.insertUser(params).catch((error) => {
        res.status(500);
        res.send({ message: error.message });
    });

    if (!user) {
        res.status(403);
        res.send({
            message: 'Ya existe un usuario relacionado con el correo ingresado',
            verbose: 'duplicate user',
        });
        return;
    }

    const token = jwt.sign({ user }, '123456', {
        expiresIn: '2h',
    });

    const refreshToken = jwt.sign({ user }, '456123', {
        expiresIn: '96h',
    });

    res.status(200);
    res.send({ token, refreshToken });

    console.log('User registered.');
    console.log('User: ', data.email);
};

export default login;
