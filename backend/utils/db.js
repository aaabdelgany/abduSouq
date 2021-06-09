import config from './config.js';
import mongoose from 'mongoose';
import logger from './logger.js';

const mongoUrl = config;
const connectDb = async () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      logger.info('Connected to MongoDB!');
    })
    .catch((error) => {
      logger.error(`error connecting to mongodb ${error.message}`);
    });
};
export default connectDb;
