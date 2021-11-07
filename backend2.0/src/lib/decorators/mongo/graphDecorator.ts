import MongoDB from '../../../class/MongoDB';

const graphDecorator = (resolver: (...args: any[]) => any) => {
    return async function (...args: any[]) {
        await MongoDB.connect();
        const db = MongoDB.db('mate');
        const collection = db.collection('graphs');

        const result = await resolver.call(args, args[0], collection);

        await MongoDB.close();

        return result;
    };
};

export default graphDecorator;
