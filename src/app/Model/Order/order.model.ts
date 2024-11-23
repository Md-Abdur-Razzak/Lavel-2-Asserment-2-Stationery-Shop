import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from './order.interface';

// Define the Mongoose schema
const OrderSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => {
          // Simple regex for email validation
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        },
        message: 'Please enter a valid email address',
      },
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'stationeryProductData',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price cannot be negative'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IOrder & Document>('Order', OrderSchema);
