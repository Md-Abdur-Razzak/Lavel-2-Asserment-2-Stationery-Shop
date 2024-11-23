import { Request, Response } from 'express';
import stationeryProductData from './StationeryProductModel.model';

const stonaryCreatController = async (req: Request, res: Response) => {
  try {
    const bodyData = req.body;
    const result = await stationeryProductData.create(bodyData);
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
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

const getAllStanaryProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let filter = {};
    if (searchTerm) {
      filter = {
        $or: [
          { name: searchTerm },
          { brand: searchTerm },
          { category: searchTerm },
        ],
      };
    }
    console.log(filter);

    const result = await stationeryProductData.find(filter);
    res.status(200).json({
      message: 'Products retrieved successfully',
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

const singleProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const serch = { _id: productId };
    const result = await stationeryProductData.findById(serch);
    res.status(200).json({
      message: 'Products retrieved successfully',
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

const updateProductControllers = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { price, quantity, updatedAt } = req.body;
    const filterProduct = { _id: productId };
    const updatateSet = {
      $set: {
        price,
        quantity,
        updatedAt,
      },
    };

    await stationeryProductData.updateOne(filterProduct, updatateSet);
    const findResult = await stationeryProductData.findById(filterProduct);
    res.status(200).json({
      message: 'Product updated successfully',
      status: true,
      data: findResult,
    });
  } catch (error) {
    console.log(error);
  }
};
const deletProductControllers = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const filterProduct = { _id: productId };
    await stationeryProductData.deleteOne(filterProduct);
    const findResult = await stationeryProductData.findById(filterProduct);
    res.status(200).json({
      message: 'Product deleted successfully',
      status: true,
      data: findResult ? findResult : {},
    });
  } catch (error:any) {
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error:error.errors 
    })
  }
};

export const stonaryController = {
  stonaryCreatController,
  getAllStanaryProduct,
  singleProductController,
  updateProductControllers,
  deletProductControllers,
};
