import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
// productSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString();
//       delete returnedObject._id;
//       delete returnedObject.__v;
//     }});

export default mongoose.model('Product', productSchema);
