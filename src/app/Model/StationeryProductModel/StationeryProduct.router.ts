import express, { Request,Response ,NewableFunction} from 'express';
import { stonaryController } from './StationeryProduct.controller';
import StationeryProductSchemazod from './Stonary.zod.validation';
import { AnyZodObject } from 'zod';

const router = express.Router();

const prodectMiddleware = (sheama:AnyZodObject)=>{
 return async (req:Request,res:Response,next:NewableFunction)=>{
  try {
    await sheama.parseAsync({
      body:req.body
    })
  } catch (error) {
    next(error)
  }

  return next()
}

}
router.post('/products',prodectMiddleware(StationeryProductSchemazod), stonaryController.stonaryCreatController);
router.get('/products', stonaryController.getAllStanaryProduct);
router.get('/products/:productId', stonaryController.singleProductController);
router.put('/products/:productId', stonaryController.updateProductControllers);
router.delete(
  '/products/:productId',
  stonaryController.deletProductControllers,
);

export default router;
