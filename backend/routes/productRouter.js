import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

const prodRouter = express.Router();

//@desc fetch all prods
//@route GET /api/products
//@access Public
prodRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
//@desc fetch product
//@route GET /api/products/:id
//@access Public
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

export default prodRouter;
