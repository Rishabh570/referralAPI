import { Schema, model, Model } from 'mongoose';
import { userInterface } from '../interfaces';


export const userSchema = new Schema<userInterface.IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  flags: {
    hasInvested: {
      type: Boolean,
      default: false
    },
  },
  referralCode: {
    type: String,
    default: null
  },
  referredBy: {
    type: String,
    default: null
  },
  smallbucks: {
    type: Number,
    default: 0
  },
});

export const Users: Model<userInterface.IUser> = model('users', userSchema, 'users');
