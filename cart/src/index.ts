import sequelize from './database/database';
import app from './app';

const port = process.env.PORT || 3002;

sequelize.sync({force:true}).then(() => {
  app.listen(port, () => {
    console.log(`Cart service running on port ${port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
