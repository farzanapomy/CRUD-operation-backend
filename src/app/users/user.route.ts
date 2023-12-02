import express from 'express';
import { UsersController } from './user.controller';
const router = express.Router();

router.post('/users', UsersController.createUser);
router.get('/users', UsersController.getAllPerson);


export const UsersRoutes = router;


