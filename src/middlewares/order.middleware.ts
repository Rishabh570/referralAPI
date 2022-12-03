import jwt from 'jsonwebtoken';
import { RequestHandler, Response } from "express";
import { HttpResponse } from "../domain/response";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { authToken } from '../config/config';
// import { IAuthenticatedUser } from '../interfaces/IUser';

export const verifyToken: RequestHandler = (req, res, next) => {
  let jwtToken: string | undefined = req.cookies.token;

  if (!jwtToken) {
    return res.status(Code.NOT_AUTHORIZED)
      .send(new HttpResponse(Code.NOT_AUTHORIZED, Status.NOT_AUTHORIZED, 'Please login'));
  }

  // TODO: use correct interface for data
  jwt.verify(jwtToken, authToken, (error: Error, data: any) => {
    if (error) {
      return next(new Error('Could not verify token'));
    }

    // @ts-ignore
    req.user = data;
    return next();
  });
}