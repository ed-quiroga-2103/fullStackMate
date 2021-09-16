import mongoDecorator from '../decorators/mongo/mongoDecorator';
import getUser from './user/getUser';
import insertUser from './user/insertUser';
import graph from './graph';

const userDecorator = mongoDecorator('user');

export default {
    graph,
    insertUser: userDecorator(insertUser),
    getUser: userDecorator(getUser),
};
