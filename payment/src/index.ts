import app from './app';
import dotenv from 'dotenv';
import connectConsumer from './kafka/consumer'
dotenv.config();

const port = process.env.PORT || 3004;

connectConsumer().catch(console.error);

app.listen(port, () => {
  console.log(`Payment service running on port ${port}`);
});
