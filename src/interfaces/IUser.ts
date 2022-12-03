import { Request, RequestHandler, Response } from "express";

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

export interface IAuthenticatedUser extends Request {
  user: IUser;
}

export interface IAuthenticatedRequestHandler extends RequestHandler {
  user: IUser;
}

export interface IAuthenticatedResponse extends Response {
  user: IUser;
}