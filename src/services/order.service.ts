import { Document, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { authToken, ORDER_API_URL } from "../config/config";
import { performHTTPRequest } from "../helpers/network.helper";
import { userModel } from '../models';

export const getUserById = (query: FilterQuery<Document>, projection: any | null = {}) => {
  return userModel.Users.findOne(query, projection).lean().exec();
};

export const updateUser = (findObj: FilterQuery<Document>, updateObj: UpdateQuery<Document>, optional?: QueryOptions) => {
  return userModel.Users.updateOne(findObj, updateObj, optional);
};

export const placeOrderOnExchange = () => {
  const URL = `${ORDER_API_URL}/orders/placeOrder`;

  return performHTTPRequest({
    method: 'POST',
    url: URL,
    config: { withCredentials: true },
    headers: { 'Content-Type': 'application/json', 'x-sc-authorization': authToken },
  })
    .then((res) => {
      const resp = res.data;
      console.log('[ORDER API] response: ', resp);
      return resp;
    })
    .catch((err) => Promise.reject(err));
}