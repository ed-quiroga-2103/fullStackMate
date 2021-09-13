import express from 'express';
import me from './me';

const userApp = express();

userApp.get('/me', me);

export default userApp;
