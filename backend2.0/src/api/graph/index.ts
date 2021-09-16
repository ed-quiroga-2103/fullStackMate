import express from 'express';
import createGraph from './createGraph';
import getGraph from './getGraph';
import updateGraph from './updateGraph';

const graphsApp = express();

graphsApp.post('/graph', createGraph);
graphsApp.get('/graph', getGraph);
graphsApp.put('/graph', updateGraph);

export default graphsApp;
