import axios from 'axios';
import config from '../../config';

const login = async (email: string, password: string) => {
    const response = await axios.post(`${config.API_URL}/auth/login`, {
        email,
        password,
    });

    return response;
};

export default login;
