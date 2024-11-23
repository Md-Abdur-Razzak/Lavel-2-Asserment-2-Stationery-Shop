import express from 'express';
import { stonaryController } from './StationeryProduct.controller';

const router = express.Router();

router.post('/products', stonaryController.stonaryCreatController);
router.get('/products', stonaryController.getAllStanaryProduct);
router.get('/products/:productId', stonaryController.singleProductController);
router.put('/products/:productId', stonaryController.updateProductControllers);
router.delete(
  '/products/:productId',
  stonaryController.deletProductControllers,
);

export default router;
