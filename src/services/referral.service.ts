import { Document, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { referralInterface } from "../interfaces";
import { referralModel } from "../models";

export const addReferral = (referralData: referralInterface.IAddReferralInterface) => {
    return referralModel.Referral.insertMany({ ...referralData, investedDate: new Date().toISOString(), hasInvested: false })
}

export const getReferrer = (query: FilterQuery<Document>, projection: any | null = {}) => {
    return referralModel.Referral.findOne(query, projection).lean().exec();
};

export const updateReferralDoc = (findObj: FilterQuery<Document>, updateObj: UpdateQuery<Document>, optional?: QueryOptions) => {
    return referralModel.Referral.updateOne(findObj, updateObj, optional);
  };