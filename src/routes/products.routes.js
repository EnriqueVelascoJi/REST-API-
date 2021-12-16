import { Router } from "express";
const router = Router();

//Import the controller
import productsController from '../controllers/products.controllers'

//Import the middleware
import verify from '../middlewares/verifySignup'
import auth from '../middlewares/authJw'

router.post('/', [auth.verifyToken, auth.isModerator], productsController.createProduct);
router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.put('/:productId', [auth.verifyToken, auth.isAdmin], productsController.updateProductsById);
router.delete('/:productId', [auth.verifyToken, auth.isAdmin], productsController.deleteProductById);

export default router;