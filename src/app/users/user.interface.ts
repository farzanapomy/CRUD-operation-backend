import { Model } from 'mongoose';

export type FullName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  street: string;
  city: string;
  country: string;
};
export type Orders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: Orders[];
  isDeleted?: boolean;
};
export interface IUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: string): Promise<TUser | null>;
}
