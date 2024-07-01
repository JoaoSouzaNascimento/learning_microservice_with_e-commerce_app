import sequelize from './database/database';
import app from './app';
import { connectProducer } from './kafka/producer';
import { connectConsumer } from './kafka/consumer';

const port = process.env.PORT || 3005;

sequelize.sync().then(async () => {
  await connectProducer();
  await connectConsumer();

  app.listen(port, () => {
    console.log(`Stock service running on port ${port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
