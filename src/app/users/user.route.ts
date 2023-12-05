import express from 'express';
import { UsersController } from './user.controller';
const router = express.Router();

router.post('/users', UsersController.createUser);
router.get('/users', UsersController.getAllUsers);
router.get('/users/:userId', UsersController.getSingleUser);
router.put('/users/:userId', UsersController.updateSingleUser);
router.delete('/users/:userId', UsersController.deleteSingleUser)

export const UsersRoutes = router;
