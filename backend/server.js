// import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './utils/db.js';
import prodRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import imageRouter from './routes/imageRouter.js';
import middleware from './utils/middleware.js';
import path from 'path';
dotenv.config();
const app = express();
app.use(express.json());
const __dirname = path.resolve();

connectDb();
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.use(morgan('combined'));

app.use('/api/products', prodRouter);
app.use('/users', userRouter);
app.use('/api/imgs', imageRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/backend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'backend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('./build'));
//   console.log(path.join(__dirname, 'backend/build', 'index.html'));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'backend/build', 'index.html'))
//   );
// }

app.listen(PORT, console.log(`Server running in ${MODE} on port ${PORT}`));
