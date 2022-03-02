import express from 'express';

import UserRoute from './routes/UserRoute';

const app = express();

app.use(express.json());

app.use(UserRoute);

export default app;
