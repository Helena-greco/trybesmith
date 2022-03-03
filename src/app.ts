import express from 'express';

import UserRoute from './routes/UserRoute';
import ProdRoute from './routes/ProdRoute';

const app = express();

app.use(express.json());

app.use(UserRoute);
app.use(ProdRoute);

export default app;
