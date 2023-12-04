import { Schema, model } from 'mongoose';
import { Address, FullName, IUserModel, Orders, TUser } from './user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, 'Please enter a First name'],
    trim: true,
    unique: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please enter a Last name'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const addressSchema = new Schema<Address>({
  street: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    trim: true,
    required: true,
  },
});
// const orderSchema = new Schema<Orders>({
//   productName: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   price: {
//     type: Number,
//     trim: true,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     trim: true,
//     required: true,
//   },
// });

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxLength: [20, 'Password can not exceed 20 characters'],
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String, String],
    required: [true, 'hobbies is required'],
  },
  address: {
    type: addressSchema,
    required: [true, 'hobbies is required'],
  },
});

//
userSchema.statics.isUserExists = async function (id: string) {
  const user = await UsersModel.findOne({ id }).select(
    '-_id -__v -password -order -isDeleted -fullName._id -address._id -orders ',
  );
  if (!user) {
    throw {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    };
  }
  return user;
};

export const UsersModel = model<TUser, IUserModel>('User', userSchema);
