import UserModel from '../database/schemas/User';

const login = async (email, password) => {
    const user = await UserModel.find({ email, password });

    return user[0];
};

export default login;
