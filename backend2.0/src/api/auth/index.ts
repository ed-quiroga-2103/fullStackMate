import express from 'express';
import login from './login';
import register from './register';

const authApp = express();

authApp.post('/login', login);
authApp.post('/register', register);
authApp.post('/abv', (req, res) => {
    res.send({ a: 'a' });
});

export default authApp;
