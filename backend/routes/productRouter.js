import express from 'express';
import Product from '../models/product.js';

const prodRouter = express.Router();

prodRouter.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

prodRouter.get('/:id', async (req, res) => {
  const prod = await Product.findOne({ _id: req.params.id });
  res.json(prod);
});

export default prodRouter;
