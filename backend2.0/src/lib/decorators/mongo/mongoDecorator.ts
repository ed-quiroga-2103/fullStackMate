import graphDecorator from './graphDecorator';
import userDecorator from './userDecorator';

type decoratorTypes = 'user' | 'graph';

const mongoDecorator = (type: decoratorTypes) => {
    switch (type) {
        case 'user': {
            return userDecorator;
        }
        case 'graph': {
            return graphDecorator;
        }
    }
};

export default mongoDecorator;
