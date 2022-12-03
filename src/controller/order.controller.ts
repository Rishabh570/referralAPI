import { Request, RequestHandler, Response } from 'express';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { getOrderSummary } from '../helpers/order.helper';
import { IAuthenticatedUser } from '../interfaces/IUser';
import { getUserById, updateUser } from '../services/order.service';

// @ts-ignore
export const placeOrderIntent: RequestHandler = async (req: IAuthenticatedUser, res) => {
  try {
    const { scid, orderType, useCoins, investAmount } = req.body;
    if (!scid || !orderType || !investAmount || typeof useCoins === 'undefined') {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid request format'));
    }

    // Fetch user info from JWT
    // @ts-ignore
    const { id } = req.user;
    const userObj = await getUserById({ _id: id });
    console.log('userObj: ', userObj);
    if(!userObj) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid user'));
    }

    const orderSummary = getOrderSummary(userObj, investAmount, useCoins, orderType, scid);

    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Order Placed successfully', orderSummary ));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
}

export const placeOrderConfirm = async (req: Request, res: Response) => {
  try {
    const { investAmount, useCoins, scid, coinsUsed, orderType } = req.body;
    if (!investAmount || typeof useCoins === 'undefined'  || !scid || !coinsUsed || !orderType) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid request format'));
    }

    // @ts-ignore
    const { id } = req.user;
    const userObj = await getUserById({ _id: id });
    console.log('userObj: ', userObj);
    if(!userObj) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid user'));
    }

    // calculate everything again
    const orderSummary = getOrderSummary(userObj, investAmount, useCoins, orderType, scid);

    
    // TODO: invoke orders API 


    const { flags } = userObj;
    const { hasInvested } = flags;

    /**
     *  Referrer:
     * 1. //TODO: Gets referral bonus = 100 INR worth of smallbucks
     * 2. //TODO: create new referredTo document
     * 3. //TODO: Send an email to referrer notifying successful onboarding of the referred user
    */
    



    /**
     *  New user:
     * 1. Only needs to pay GST fees
     * 2. //TODO: send a celebratory OU success email (with their newly create referral code)
     * 3. set hasInvested to true
    */
    await updateUser({ _id: id }, { hasInvested: true });


    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Order Placed successfully', orderSummary ));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
}