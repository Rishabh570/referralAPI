import * as jwt from 'jsonwebtoken';

import { userModel } from "../models";
import { FilterQuery, Document } from 'mongoose'
import { authToken } from "../config/config";

export const findUser = (findObj: FilterQuery<Document>, projection?: any) => {
    return userModel.Users.find(findObj, projection);
}

export const addUser = (userDocument: any) => {
    return userModel.Users.insertMany(userDocument)
}

export const generateJwt = (payload: any, secret?: any) => {
    return jwt.sign(payload, secret || authToken);
}