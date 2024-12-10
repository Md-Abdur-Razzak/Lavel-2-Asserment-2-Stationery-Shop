import { NextFunction, Request, RequestHandler, Response } from 'express';
import stationeryProductData from './StationeryProductModel.model';
import config from '../../config';
import StationeryProductSchemazod from './Stonary.zod.validation';
import caseAscync from '../../utilis/caseAscy';

//---------Stonary Producr creat a Controller-------------
const stonaryCreatController = caseAscync(async (req: Request, res: Response) => {

    const bodyData = req.body;
    const useData = StationeryProductSchemazod.parse(bodyData)
    const result = await stationeryProductData.create(useData);
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
 

})

//--------Get All Data Stonary Product and use search Qurey-----
const getAllStanaryProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let filter = {};
    //------product Quray-------
    if (searchTerm) {
      filter = {
        $or: [
          { name: searchTerm },
          { brand: searchTerm },
          { category: searchTerm },
        ],
      };
    }
   //------find a product-------
    const result = await stationeryProductData.find(filter);
    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error:any) {
    res.status(400).json({
      message: "ValidationError",
      success: false,
      error:error.errors 
    })
  }
};

//--------find by single product--------------------
const singleProductController = async (req: Request, res: Response,next:NextFunction) => {
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
    next(error)
  }
};

 

//----updating data in product----------
const updateProductControllers = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    //---qure by _id-----
    const filterProduct = { _id: productId };
    const updatateSet = {
      $set: {
       ...req.body
      },
    };
    //-----update by response---------
    await stationeryProductData.updateOne(filterProduct, updatateSet);
    const findResult = await stationeryProductData.findById(filterProduct);
    res.status(200).json({
      message: 'Product updated successfully',
      status: true,
      data: findResult,
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

// --------Delelat by product----------
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
    res.status(400).json({
      message: "ValidationError",
      success: false,
      error:error.errors ,
      stack:config.node_env === 'development' ? error.stack : undefined,

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
