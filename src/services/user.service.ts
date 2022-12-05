import * as jwt from 'jsonwebtoken';

import { userModel } from "../models";
import { FilterQuery, Document, UpdateQuery, QueryOptions } from 'mongoose'
import { authToken } from "../config/config";

export const findUser = (findObj: FilterQuery<Document>, projection?: any) => {
    return userModel.Users.find(findObj, projection);
}

export const addUser = (userDocument: any) => {
    return userModel.Users.insertMany(userDocument)
}

export const updateUser = (findObj: FilterQuery<Document>, updateObj: UpdateQuery<Document>, optional?: QueryOptions) => {
    return userModel.Users.updateOne(findObj, updateObj, optional);
};

export const getUserById = (query: FilterQuery<Document>, projection: any | null = {}) => {
    return userModel.Users.findOne(query, projection).lean().exec();
};

export const generateJwt = (payload: any, secret?: any) => {
    return jwt.sign(payload, secret || authToken);
}