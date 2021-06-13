import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const userRouter = express.Router();

userRouter.post('/new', async (req, res) => {
  try {
    const hashedPw = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPw });
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).send({ error });
  }
});

userRouter.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    const userForToken = {
      email: user.email,
      id: user._id,
    };
    const accessToken = jsonwebtoken.sign(
      userForToken,
      process.env.TOKEN_SECRET
    );
    if (match) {
      res.json({ accessToken, email: user.email });
    } else {
      res.json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default userRouter;
