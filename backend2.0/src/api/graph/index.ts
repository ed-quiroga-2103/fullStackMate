import express from 'express';
import updateGraph from './updateGraph';
import validateTokenMiddleware from '../validateTokenMiddleware';
import createGraph from './createGraph';
import getGraphById from './getGraphById';

const graphApp = express();

graphApp.use(validateTokenMiddleware);

graphApp.post('/', createGraph);

graphApp.get('/:id', getGraphById);

graphApp.put('/:id', updateGraph);

export default graphApp;
