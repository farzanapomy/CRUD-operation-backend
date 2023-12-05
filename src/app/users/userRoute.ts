import express from 'express';
import { UsersController } from './user.controller';
const router = express.Router();

router.post('/users', UsersController.createUser);
router.get('/users', UsersController.getAllUsers);
router.get('/users/:userId', UsersController.getSingleUser);
router.put('/users/:userId', UsersController.updateSingleUser);
router.delete('/users/:userId', UsersController.deleteSingleUser);
router.put('/users/:userId/orders', UsersController.createOrderInUser);
router.get('/users/:userId/orders', UsersController.getOrderUsers);
router.get('/users/:userId/orders/total-price', UsersController.totalPriceCalc);

export const UsersRoutes = router;
