import { Router } from 'express';
import { userController } from '../controller';
const userRoute = Router();

userRoute.post('/signup', userController.signup);
userRoute.post('/login', userController.login);

export default userRoute;
