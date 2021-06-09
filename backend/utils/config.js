import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV;

let config;

if (process.env.NODE_ENV === 'dev') {
  config = process.env.DEV_MONGODB_URI;
} else {
  config = process.env.MONGODB_URI;
}

export default config;
