import { Request, RequestHandler, Response } from 'express';
import { offerCodeLength, referrerRewardINR, smallbucksMultiplier } from '../config/config';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { getOrderSummary } from '../helpers/order.helper';
import { IAuthenticatedUser } from '../interfaces/IUser';
import { referralService, orderService, offerService } from '../services';

// @ts-ignore
export const placeOrderIntent: RequestHandler = async (req: IAuthenticatedUser, res) => {
  try {
    const { scid, orderType, useCoins, investAmount } = req.body;
    if (!scid || !orderType || !investAmount) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid request format'));
    }

    // Fetch user info from JWT
    // @ts-ignore
    const { id } = req.user;
    const userObj = await orderService.getUserById({ _id: id });
    console.log('userObj: ', userObj);
    if(!userObj) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid user'));
    }

    const orderSummary = getOrderSummary(userObj, investAmount, useCoins, orderType, scid);

    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Order Placed successfully', orderSummary ));
  } catch (error: any) {
    console.error(error);
    const errMessage = error.message as string;
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, errMessage || 'An error occurred'));
  }
}

export const placeOrderConfirm = async (req: Request, res: Response) => {
  try {
    const { investAmount, useCoins, scid, coinsUsed, orderType } = req.body;
    if (!investAmount || !scid || !coinsUsed || !orderType) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid request format'));
    }

    // @ts-ignore
    const { id } = req.user;
    const userObj = await orderService.getUserById({ _id: id });
    console.log('userObj: ', userObj);
    if(!userObj) {
      return res.status(Code.BAD_REQUEST)
      .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid user'));
    }

    // calculate everything again
    const orderSummary = getOrderSummary(userObj, investAmount, useCoins, orderType, scid);

    
    // invoke orders API; gives response message based on orderType
    await orderService.placeOrderOnExchange();

    const { flags, referredBy } = userObj;
    const { hasInvested: newUserHasInvested } = flags;

    /**
     *  Referrer
    */
    if(referredBy && !newUserHasInvested) {
      // add 100 INR worth of coins to referrer's account
      const smallbucksToAdd = referrerRewardINR * smallbucksMultiplier;
      await orderService.updateUser({ _id: referredBy }, { $inc: { smallbucks: smallbucksToAdd } });

      // TODO: 2. send an email to referrer notifying successful onboarding of the referred user
    }

    /**
     *  New user:
     * 1. Only needs to pay GST fees
     * 2. send a celebratory OU success email (with their newly create referral code)
     * 3. set hasInvested to true in Users and Referral collections
     * 4. generate a fresh referralCode for new user and attach to the user document
    */
    if(!newUserHasInvested) {
      // generate a fresh referralCode for new user
      const freshOfferCode = offerService.generateOfferCode(offerCodeLength);

      // refund GST as smallbucks to new user
      const { smallbucksEarned } = orderSummary;

      // update referralCode and hasInvested for new user
      await orderService.updateUser({ _id: id }, { $set: { 'flags.hasInvested': true, referralCode: freshOfferCode }, $inc: { smallbucks: smallbucksEarned} });
      await referralService.updateReferralDoc({ referredTo: id }, { hasInvested: true, investDate: new Date() });


      // TODO: Send a celebratory OU success email (with their newly create referral code)

    }
    else {
      // TODO: Send a normal OU success email (with their referral code) 
    }

    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Order Placed successfully', orderSummary ));
  } catch (error: any) {
    console.error(error);
    const errMessage = error.message as string; 
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, errMessage || 'An error occurred'));
  }
}