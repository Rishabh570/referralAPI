import { Router } from 'express';
import { referralController } from '../controller';
const referralRoutes = Router();

referralRoutes.get('/', referralController.referPage);

export default referralRoutes;
