import { Request, RequestHandler, Response } from "express";
import { IReferral } from "./IReferral";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  flags: {
      hasInvested: boolean;
  },
  referralCode?: string;
  referredBy: string | null;
  smallbucks: number;
}

export interface IJwtUser {
  id : string;
}
export interface IAuthenticatedUser extends Request {
  user: IJwtUser;
}

export interface IAuthenticatedRequestHandler extends RequestHandler {
  user: IJwtUser;
}

export interface IAuthenticatedResponse extends Response {
  user: IJwtUser;
}

export interface IUserDetailsResponse {
  userDetails: IUser,
  referralDetails: IReferral
}