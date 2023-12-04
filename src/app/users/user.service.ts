import { TUser } from './user.interface';
import { UsersModel } from './user.modal';

const createUsersIntoDB = async (userData: TUser) => {
  const userResult = await UsersModel.create(userData);
  return userResult;
};

const getAllUserFromDB = async () => {
  const result = await UsersModel.aggregate([
    {
      $project: {
        _id: 0,
        userId: 0,
        password: 0,
        isActive: 0,
        hobbies: 0,
        isDeleted: 0,
        orders: 0,
        fullName: {
          _id: 0,
        },
        address: {
          _id: 0,
        },
        __v: 0,
      },
    },
  ]);
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await UsersModel.isUserExists(id);
  return user;
};

export const UsersServices = {
  createUsersIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
