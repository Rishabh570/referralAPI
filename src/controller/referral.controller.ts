import { Request, RequestHandler, Response } from "express";

export const referPage: RequestHandler = (req: Request, res: Response) => {
  res.render('refer', { layout: 'index' });
}