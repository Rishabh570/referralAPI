import { referralInterface } from "../interfaces";
import { referralModel } from "../models";
export const addReferral = (referralData: referralInterface.IAddReferralInterface) => {
    return referralModel.Referral.insertMany({ ...referralData, investedDate: new Date().toISOString(), hasInvested: false })
}