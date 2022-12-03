import { Schema, model, Model } from 'mongoose';
import { userInterface } from '../interfaces';


export const userSchema = new Schema<userInterface.IUser>({
  name: {
    type: String
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
  referredTo: [
    {
      _id: {
        type: String
      },
      name: {
        type: String
      },
      hasInvested: {
        type: Boolean 
      },
      investDate : {
        type: String,
        default: Date.now
      },
    }
  ],
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
