import { Schema, model } from 'mongoose';
import { StationeryProduct } from './StationeryProductModel.interface';
import bcrypt from 'bcrypt'
import config from '../../config';
const stationeryProductSchema = new Schema<StationeryProduct>(
  {
    name: { 
      type: String, 
      required: [true, "Product name is required"], 
      trim: true, 
      minlength: [2, "Product name must be at least 2 characters long"] 
    },
    password:{
      type:String,
      required:[true,"password must be required"],
      trim:true
    },
    brand: { 
      type: String, 
      required: [true, "Brand is required"], 
      trim: true 
    },
    price: { 
      type: Number, 
      required: [true, "Price is required"], 
      min: [0, "Price must be a positive number"] 
    },
    category: {
      type: String,
      enum: {
        values: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
        message: "{VALUE} is not a valid category",
      },
      required: [true, "Category is required"],
    },
    description: { 
      type: String, 
      required: [true, "Description is required"], 
      minlength: [10, "Description must be at least 10 characters long"] 
    },
    quantity: { 
      type: Number, 
      required: [true, "Quantity is required"], 
      min: [0, "Quantity must be a positive number"] 
    },
    inStock: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true },
);

stationeryProductSchema.pre('save',async function(next){
  const user = this
  user.password = await bcrypt.hash(user.password,Number(config.bycript_pass))
  next()
  
})

stationeryProductSchema.post('save',function(doc,next){
  doc.password = " "
  next()
})

const stationeryProductData = model<StationeryProduct>(
  'stationeryProductData',
  stationeryProductSchema,
);
export default stationeryProductData;
