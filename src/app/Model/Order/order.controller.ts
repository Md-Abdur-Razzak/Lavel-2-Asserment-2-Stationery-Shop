import stationeryProductData from '../StationeryProductModel/StationeryProductModel.model';
import { Request, Response } from 'express';
import OrderData from './order.model';

const geithingOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
    //  ---------check the avaiabel Stanary Product
    const stanoryProduct = await stationeryProductData.findById(product);

    if (!stanoryProduct) {
      return res.status(404).json({
        message: 'Product not found.',
        status: false,
      });
    }

    if (stanoryProduct.quantity < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock available.',
        status: false,
      });
    }
    stanoryProduct.quantity -= quantity;
    await stanoryProduct.save();
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
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error:error.errors 
    })
  }
};

const calculteRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderData.aggregate([
      {
        $lookup: {
          from: 'stationeryproductdatas', // Ensure this matches your collection name
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error calculating revenue',
      status: false,
    });
  }
};

export const orderController = {
  geithingOrder,
  calculteRevenue,
};
