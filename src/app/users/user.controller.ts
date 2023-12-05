import { Request, Response } from 'express';
import { UsersServices } from './user.service';
import usersValidationSchema from './joi.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // creating  joi validation service
    const { error, value } = usersValidationSchema.validate(user);
    console.log(error, value);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error,
      });
    }
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
    const { userId } = req.params;
    console.log(userId);
    const result = await UsersServices.getSingleUserFromDB(userId);
    console.log(result);
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

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const result = await UsersServices.updateSingleUserFromDB(userId, data);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
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

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log('userId from delete api', userId);
    const result = await UsersServices.deleteUserFromDB(userId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
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

const createOrderInUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const body = req.body;
    const result = await UsersServices.createOrderFromDB(userId, body);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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
const getOrderUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UsersServices.getOrderUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
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
const totalPriceCalc = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UsersServices.totalPriceCalCForPerUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
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
  updateSingleUser,
  deleteSingleUser,
  createOrderInUser,
  getOrderUsers,
  totalPriceCalc,
};
