import mongoDecorator from '../decorators/mongo/mongoDecorator';
import getUser from './user/getUser';
import insertUser from './user/insertUser';

const decoratorType = 'user';

const userDecorator = mongoDecorator(decoratorType);

export default {
    insertUser: userDecorator(insertUser),
    getUser: userDecorator(getUser),
};
