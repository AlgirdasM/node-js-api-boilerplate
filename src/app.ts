import express from 'express';
import Loaders from './loaders';
import config from './config';

import dotenv from 'dotenv';
dotenv.config();

const app = async () => {
  const app = express();
  const { port } = config;

  await Loaders({ app });

  app.listen(port, () => console.log(`App listening on port ${port}`));
};

app();

export default app;
