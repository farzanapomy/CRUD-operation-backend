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

const getSingleUserFromDB = async (userId: string) => {
  const user = await UsersModel.isUserExists(userId);
  return user;
};

const updateSingleUserFromDB = async (userId: string, data: TUser) => {
  const user = await UsersModel.isUserExists(userId);
  if (user) {
    const result = await UsersModel.findOneAndUpdate(
      { userId },
      { ...data },
      {
        new: true,
        runValidators: true,
      },
    ).select(
      '-_id -__v -password -orders -isDeleted -fullName._id -address._id',
    );
    return result;
  }
};

const deleteUserFromDB = async (userId: string) => {
  const user = await UsersModel.isUserExists(userId);
  if (user) {
    const result = await UsersModel.findOneAndUpdate(
      { userId },
      { isDeleted: true },
    ).select('isDeleted');
    if (result?.isDeleted) {
      return null;
    }
    return null;
  }
};
const createOrderFromDB = async (userId: string, body: TUser) => {
  const user = await UsersModel.isUserExists(userId);
  if (user) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await UsersModel.findOneAndUpdate(
      { userId },
      { $addToSet: { orders: body } },
    ).select('orders');
  }
  return null;
};

const getOrderUserFromDB = async (userId: string) => {
  const user = await UsersModel.isUserExists(userId);
  if (user) {
    const result = await UsersModel.findOne({ userId }).select(
      '-orders._id -_id -userName -age -address -isDeleted -isActive -fullName -username -userId -password -email -hobbies -__v',
    );
    return result;
  }
};

const totalPriceCalCForPerUserFromDB = async (userId: string) => {
  const user = await UsersModel.isUserExists(userId);
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const find: any = await UsersModel.findOne({
      userId,
    }).select('_id');

    const singleUserData = await UsersModel.aggregate([
      {
        $match: {
          _id: {
            $in: [find._id],
          },
        },
      },

      { $unwind: '$orders' },
      {
        $project: {
          orders: 1,
          total: {
            $multiply: ['$orders.quantity', '$orders.price'],
          },
        },
      },
      {
        $group: {
          _id: 'orders.price',
          totalPrice: {
            $sum: { $sum: '$total' },
          },
        },
      },
      {
        $group: {
          _id: '$_id._id',
          totalPrice: {
            $sum: { $sum: '$totalPrice' },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return singleUserData;
  }
};

export const UsersServices = {
  createUsersIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
  createOrderFromDB,
  getOrderUserFromDB,
  totalPriceCalCForPerUserFromDB,
};
