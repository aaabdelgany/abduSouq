import express from 'express';
import asyncHandler from 'express-async-handler';

import Product from '../models/product.js';

const prodRouter = express.Router();

prodRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
prodRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const prod = await Product.findOne({ _id: req.params.id });
    if (prod) {
      res.json(prod);
    } else {
      res.status(404).json({ error: 'product not found!' });
    }
  })
);

prodRouter.post(
  '/addNew',
  asyncHandler(async (req, res) => {
    try {
      const product = new Product({ ...req.body });
      const newProd = await product.save();
      res.json(newProd);
    } catch (error) {
      res.json({ error });
    }
  })
);

export default prodRouter;
