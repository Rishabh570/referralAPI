import { Document, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { Users } from "../models";

export const getUserById = (query: FilterQuery<Document>, projection: any | null = {}) => {
  return Users.findOne(query, projection).lean().exec();
};

export const updateUser = (findObj: FilterQuery<Document>, updateObj: UpdateQuery<Document>, optional?: QueryOptions) => {
  return Users.updateOne(findObj, updateObj, optional);
};