export interface IReferral {
    _id: string;
    name: string;
    referredTo: string;
    referredBy: string;
    hasInvested: boolean;
    investDate : Date;
  }

  export interface IAddReferralInterface {
    referredTo: string;
    referredBy: string;
    investedDate: Date;
    hasInvested: boolean;
    name: string;
  }