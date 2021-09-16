import mongoDecorator from '../../decorators/mongo/mongoDecorator';
import getGraph from './getGraph';
import insertGraph from './insertGraph';
import updateGraph from './updateGraph';

const graphDecorator = mongoDecorator('graph');

export default {
    insertGraph: graphDecorator(insertGraph),
    getGraph: graphDecorator(getGraph),
    updateGraph: graphDecorator(updateGraph),
};
