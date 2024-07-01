import express from 'express';
import orderRoutes from './routes/stockRoutes';

const app = express();

app.use(express.json());

app.use('/stock', orderRoutes);

export default app;