import sequelize from './database/database';
import app from './app';

const port = process.env.PORT || 3000;

sequelize.sync({force:true}).then(() => {
  app.listen(port, () => {
    console.log(`User Auth service running on port ${port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});