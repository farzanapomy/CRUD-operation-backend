import { TUser } from './user.interface';
import { UsersModel } from './user.modal';

const createUsersIntoDB = async (userData: TUser) => {
  const userResult = await UsersModel.create(userData);
  return userResult;
};

const getAllUserFromDB = async () => {
  const result = await UsersModel.find();
  return result;
};

export const UsersServices = {
  createUsersIntoDB,
  getAllUserFromDB,
};
