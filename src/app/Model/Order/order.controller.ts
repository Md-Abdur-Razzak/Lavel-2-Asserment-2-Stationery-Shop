import stationeryProductData from '../StationeryProductModel/StationeryProductModel.model';
import {  RequestHandler } from 'express';
import OrderData from './order.model';
import config from '../../config';

const caseAscy = ()=>{
  
}
//-------order getting the user---------
const geithingOrder:RequestHandler = async (req, res) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
    //  ---------check the avaiabel Stanary Product
    const stanoryProduct = await stationeryProductData.findById(product);

    if (!stanoryProduct) {
      return res.status(400).json({
        message: 'Product not found.',
        status: false,
      });
    }
// --------------quantity check----
    if (stanoryProduct.quantity < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock available.',
        status: false,
      });
    }
    // -----decreiment product-----
    stanoryProduct.quantity -= quantity;
    await stanoryProduct.save();
    //-----quntity 0 thats way inStock false--
    if (stanoryProduct.quantity === 0) {
      stanoryProduct.inStock = false;
      await stanoryProduct.save();
    }

    const result = await OrderData.create({
      email,
      product,
      quantity,
      totalPrice,
    });
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error:any) {
    res.status(400).json({
      message: "ValidationError",
      success: false,
      error:error.errors ,
      stack:config.node_env === 'development' ? error.stack : undefined,

    })
  }
};
//----Totall Product calculteRevenue-------
const calculteRevenue:RequestHandler = async (req, res) => {
  try {
    const result = await OrderData.aggregate([
      //-----state 1=>find prodeuct data--
      {
        $lookup: {
          from: 'stationeryproductdatas', 
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      //----state 2 =>product show---
      {
        $unwind: '$productDetails',
      },
      //---state 3 =>calculte the all frice----
      {
        $project: {
          _id: 0,
          totalOrderRevenue: {
            $multiply: ['$productDetails.price', '$quantity'],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalOrderRevenue' },
        },
      },
    ]);

    const totalRevenue = result[0]?.totalRevenue || 0;

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error:any) {
    res.status(500).json({
      message: 'Error calculating revenue',
      status: false,
      error:error.errors,
      stack:config.node_env === 'development' ? error.stack : undefined,

    });
  }
};

export const orderController = {
  geithingOrder,
  calculteRevenue,
};
