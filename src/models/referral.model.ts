import { Schema, model, Model } from 'mongoose';
import { referralInterface } from '../interfaces';


export const userSchema = new Schema<referralInterface.IReferral>({
  referredBy: {
    type: String,
    index: true,
  },
  referredTo: {
    type: String,
    index: true,
  },
  name: {
    type: String
  },
  hasInvested: {
    type: Boolean,
    default: false
  },
  investDate: {
    type: Date,
    default: Date.now
  },
});
export const Referral: Model<referralInterface.IReferral> = model('referral', userSchema, 'referral');
