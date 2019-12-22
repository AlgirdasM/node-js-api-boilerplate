import ExpressLoader from './express';

const Loaders = async ({ app }) => {
  await ExpressLoader({ app });
};

export default Loaders;
