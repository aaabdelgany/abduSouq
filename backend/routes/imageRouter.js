// import path from 'path';
import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import stream from 'stream';
import path from 'path';
const __dirname = path.resolve();
console.log(`${__dirname}/frontend/public/images/`);
const imageRouter = express.Router();
const pipeline = promisify(stream.pipeline);

//@desc fetch all prods
//@route GET /api/products
//@access Public

const upload = multer();
imageRouter.post(
  '/imgUpload',
  upload.single('image'),
  asyncHandler(async (req, res, next) => {
    const { file } = req;
    if (
      file.detectedFileExtension !== '.jpg' &&
      file.detectedFileExtension !== '.jpeg'
    ) {
      res.status(422).json({ error: 'Invalid File Type!' });
    } else {
      const fileName = `image${Math.floor(Math.random() * 10000)}${
        file.detectedFileExtension
      }`;
      console.log('test');
      await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/frontend/public/images/${fileName}`)
      );
      console.log('test2');
      res.status(200).json({ image: `/images/${fileName}` });
    }
  })
);

export default imageRouter;
