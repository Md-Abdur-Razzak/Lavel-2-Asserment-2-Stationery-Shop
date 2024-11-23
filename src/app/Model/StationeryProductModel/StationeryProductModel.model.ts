import { Schema, model } from 'mongoose';
import { StationeryProduct } from './StationeryProductModel.interface';
const stationeryProductSchema = new Schema<StationeryProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const stationeryProductData = model<StationeryProduct>(
  'stationeryProductData',
  stationeryProductSchema,
);
export default stationeryProductData;
