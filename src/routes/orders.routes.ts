import { Router } from 'express';
import { orderController, userController } from '../controller';
const orderRoutes = Router();

orderRoutes.post('/intent', orderController.placeOrderIntent);
orderRoutes.post('/confirm', orderController.placeOrderConfirm);
orderRoutes.get('/users/details', userController.getUserDetails);
export default orderRoutes;
