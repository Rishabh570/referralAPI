export const PORT = process.env.SERVER_PORT
export const authToken = process.env.authToken || 'secretAuthTokenValue';
export const shortenerAPIURL = process.env.shortenerAPIURL || 'http://localhost';
export const notificationProducerURL = process.env.notificationProducerURL || 'http://localhost';
export const offerCodeLength = 12;
export const smallbucksMultiplier = 10;
export const referrerRewardINR = 100;
export const referralShortLinkTwitter = process.env.referralLinkTwitter || 'http://172.30.4.140:8000/signup?referralCode=';
export const REFERRAL_API_URL = process.env.REFERRAL_API_URL;
export const ORDER_API_URL = process.env.ORDER_API_URL;
export const REFERRAL_OFFER_BANNER = process.env.REFERRAL_OFFER_BANNER || 'https://s3.ap-south-1.amazonaws.com/assets-dev.smallcase.com/images/offers/invite-a-friend1.png';
export const NEW_USER_REFERRAL_OFFER_BANNER = process.env.NEW_USER_REFERRAL_OFFER_BANNER || 'https://s3.ap-south-1.amazonaws.com/assets-dev.smallcase.com/images/offers/invite-a-friend1.png';
export const mongoConfig = {
    dbURI: process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/smallcase-dev',
    dbOptions: {
        user: process.env.MONGODB_USER || '',
        pass: process.env.MONGODB_PASS || '',
    },
    transactionOptions: {
        readPreference: 'primary',
        writeConcern: {
            j: false,
            wtimeout: 5000,
            w: 'majority',
        },
    },
};

export const showDebugLogs = true;