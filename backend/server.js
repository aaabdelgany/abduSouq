import express from 'express';
import data from './data/products.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './utils/db.js';
import Product from './models/product.js';

dotenv.config();
const app = express();

connectDb();
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;
app.listen(PORT, console.log(`Server running in ${MODE} on port ${PORT}`));
app.use(morgan('combined'));

app.get('/api/products', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const prod = data.find((p) => p._id === req.params.id);
  res.json(prod);
});

app.get('/', (req, res) => {
  res.send('API is running!');
});

// app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);
