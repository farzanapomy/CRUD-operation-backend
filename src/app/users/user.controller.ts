import { Request, Response } from 'express';
import { UsersServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UsersServices.createUsersIntoDB(user);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    //send error response
    res.status(500).json({
      success: false,
      message: error.message || 'Some went to be wrong',
      error: error,
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UsersServices.getAllUserFromDB();
    // send success response
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    //send error response
    res.status(500).json({
      success: false,
      message: error.message || 'Some went to be wrong',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UsersServices.getSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UsersController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
