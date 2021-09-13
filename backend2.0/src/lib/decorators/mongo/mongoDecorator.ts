import userDecorator from './userDecorator';

const mongoDecorator = (type) => {
    if (type === 'user') {
        return userDecorator;
    }
};

export default mongoDecorator;
