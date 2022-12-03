import { Request, RequestHandler, Response } from 'express';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { IAuthenticatedRequestHandler, IAuthenticatedResponse, IAuthenticatedUser } from '../interfaces/IUser';
import { getOrderSummary, getUserById } from '../services/order.service';

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
    const userObj = await getUserById(id);
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

export const placeOrderConfirm = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { investAmount, useCoins, scid, coinsUsed, orderType } = req.body;
    if (!investAmount || typeof useCoins === 'undefined'  || !scid || !coinsUsed || !orderType) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid request format'));
    }

    // @ts-ignore
    const { id } = req.user;
    const userObj = await getUserById(id);
    console.log('userObj: ', userObj);
    if(!userObj) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid user'));
    }

    // calculate everything again
    const orderSummary = getOrderSummary(userObj, investAmount);

    // invoke orders API 


    /**
     * If hasInvested === false
      * Half of my transactions fees (excluding GST) will be deducted.
      * Half of my tx fees is added to the referrer’s acc in form of coins (multiplied by 10)
      * For referrer, update the referredTo array.
      * Send an email to the referrer notifying about the successful onboarding of the person they referred (show how many coins are added to their acc)
      * Send email to the person who placed the order (OU email with referrer code).
      * Set hasInvested to true.
     */


    /**
     * If hasInvested === true 
      * Send email to the person who placed the order (OU email with referrer code).
     */


    // return
    // amount, effective fees, coins used, coins remaining, discount (= min(coins/10, tx fees), transactionCharge




    return res.status(Code.CREATED)
      .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Order Placed'));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
}