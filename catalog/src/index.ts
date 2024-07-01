import sequelize from './database/database';
import app from './app';
import { connectProducer } from './kafka/producer';

const port = process.env.PORT || 3001;

sequelize.sync({force:true}).then(async () => {
  app.listen(port, () => {
    console.log(`Catalog service running on port ${port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});