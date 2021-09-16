import express from 'express';
import { Response } from 'express';
import cors from 'cors';
import userApp from './api/user';
import authApp from './api/auth';
import graphsApp from './api/graph';

const mainApp = express();

const port = process.env.PORT || 3000;

mainApp.get('/', (req, res) => {
    res.send('Hello from express and typescript');
});

mainApp.use(
    express.json({
        verify: (_, res: Response, buf, __) => {
            try {
                JSON.parse(buf.toString());
            } catch (e) {
                res.status(405).send('Invalid JSON');
                throw Error('Invalid JSON');
            }
        },
    })
);
mainApp.use(cors());

mainApp.use('/user', userApp);
mainApp.use('/auth', authApp);
mainApp.use('/graphs', graphsApp);

mainApp.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
});
