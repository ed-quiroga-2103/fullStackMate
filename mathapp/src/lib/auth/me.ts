import axios from 'axios';
import config from '../../config';

const me = async (email: string, token: string) => {
    const response = await axios.get(`${config.API_URL}/auth/me`, {
        headers: {
            authorization: 'Bearer ' + token,
        },
    });

    return response;
};

export default me;
