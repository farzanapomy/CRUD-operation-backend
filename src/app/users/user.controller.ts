import { Request, Response } from 'express';
import { UsersServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const usersData = req.body.Users;
    const users = await UsersServices.createUsersIntoDB(usersData);
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};
const getAllPerson = async (req: Request, res: Response) => {
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

export const UsersController = {
  createUser,
  getAllPerson,
};
