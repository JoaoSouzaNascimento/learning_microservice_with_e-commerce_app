import express from 'express';
import cartRoutes from './routes/cartRoutes';

const app = express();

app.use(express.json());

app.use('/cart', cartRoutes);

export default app;
