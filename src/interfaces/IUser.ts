import { Request, RequestHandler, Response } from "express";

export interface IReferredTo {
  _id: string;
  name: string;
  hasInvested: boolean;
  investDate : string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  flags: {
      hasInvested: boolean;
  },
  referralCode: string;
  referredTo: IReferredTo[],
  referredBy: string;
  smallbucks: number;
}

export interface IAuthenticatedUser extends Request {
  user: IUser;
}

export interface IAuthenticatedRequestHandler extends RequestHandler {
  user: IUser;
}

export interface IAuthenticatedResponse extends Response {
  user: IUser;
}