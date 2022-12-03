import { Router } from 'express';
import { placeOrderIntent, placeOrderConfirm } from '../controller/order.controller';
const orderRoutes = Router();

orderRoutes.post('/intent', placeOrderIntent);
orderRoutes.post('/confirm', placeOrderConfirm);

export default orderRoutes;
