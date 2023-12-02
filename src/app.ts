import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { UsersRoutes } from './app/users/user.route';

app.use(express.json());
app.use(cors());

// routes
app.use('/api', UsersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is okay' });
});

export default app;
