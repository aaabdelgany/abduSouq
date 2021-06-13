import mongoose from 'mongoose';
import dotenv from 'dotenv';

import products from '../data/products.js';
import users from '../data/users.js';
import User from '../models/user.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import connectDb from './db.js';

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await User.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});

    const createdUsers = await User.insertMany(users);
    const admin = createdUsers[0]._id;

    const sampleProds = products.map((prod) => ({ ...prod, user: admin }));
    await Product.insertMany(sampleProds);
    console.log('Data imported!');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
