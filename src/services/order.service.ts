import { Document, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { userModel } from '../models';

export const getUserById = (query: FilterQuery<Document>, projection: any | null = {}) => {
  return userModel.Users.findOne(query, projection).lean().exec();
};

export const updateUser = (findObj: FilterQuery<Document>, updateObj: UpdateQuery<Document>, optional?: QueryOptions) => {
  return userModel.Users.updateOne(findObj, updateObj, optional);
};
