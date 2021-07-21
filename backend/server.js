// import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './utils/db.js';
import prodRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import imageRouter from './routes/imageRouter.js';
import middleware from './utils/middleware.js';
dotenv.config();
const app = express();
app.use(express.json());
connectDb();
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, console.log(`Server running in ${MODE} on port ${PORT}`));
app.use(morgan('combined'));
app.use('/api/products', prodRouter);
app.use('/users', userRouter);
app.use('/api/imgs', imageRouter);
app.get('/', (req, res) => {
  res.send('API is running!');
});

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
