import { NextFunction, Request, Response } from 'express';
// import { HttpResponse } from '../domain/response';
// import { Code } from '../enum/code.enum';
// import { Status } from '../enum/status.enum';
// import { authToken } from '../config/config';

export const checkApiKey = (req: Request, res: Response, next: NextFunction) =>{
    const headers = req.headers;
    // if(!headers['x-sc-authorization']) return res.status(Code.NOT_AUTHORIZED).send(new HttpResponse(Code.NOT_AUTHORIZED, Status.NOT_AUTHORIZED, 'Api key not present'));
    // if(headers['x-sc-authorization'] !== authToken) return res.status(Code.NOT_AUTHORIZED).send(new HttpResponse(Code.NOT_AUTHORIZED, Status.NOT_AUTHORIZED, 'Invalid api key'));
    return next();
}