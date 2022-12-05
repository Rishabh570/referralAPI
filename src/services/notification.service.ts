import { Method } from 'axios';
import { NEW_USER_REFERRAL_OFFER_BANNER, notificationProducerURL, referralShortLinkTwitter, REFERRAL_API_URL, REFERRAL_OFFER_BANNER } from '../config/config';
import { shortenerService } from '../services';
import { commonHelper, networkHelper  } from '../helpers';

const buildReferrerPayload = (referrerName: string | undefined, newUserName: string) => {
  return {
    subject: `Thanks for helping us spread the word!`,
    referrerName,
    newUserName,
    userDetailsLink: `${REFERRAL_API_URL}/users/details`,
    utmCampaign: 'user-referral-engine',
    utmContent: 'referrer',
  }
}

const buildPayloadForNewUser = async (
  referrerName: string | undefined,
  newUserName: string,
  referralCode: string | undefined
) => {
  const shortURL = await shortenerService.getShortedURL(`${referralShortLinkTwitter}${referralCode}`);

  return {
    subject: `Your first smallcase order is successful.`,
    referrerName,
    newUserName,
    userDetailsLink: `${REFERRAL_API_URL}/user`,
    utmCampaign: 'user-referral-engine',
    utmContent: 'referrer',
    referralOfferBanner: NEW_USER_REFERRAL_OFFER_BANNER,
    referralOfferLearnMoreCTA: `${REFERRAL_API_URL}/refer`, // TODO: add documentation on this page using hbs
    referralCode,
    referralLinkTwitter: shortURL,
    date: commonHelper.getShortSCDateString(
      new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
      })
    ),
    orders: [
      {
          "orderId": "5c0f67867d6bb90e4e7612a4",
          "status": "COMPLETE",
          "quantity": 1,
          "tradingsymbol": "ASIANPAINT",
          "brokersymbol": "ASIANPAINT",
          "exchange": "NSE",
          "sid": "ASPN",
          "transactionType": "BUY",
          "tag": "Z96diBp2",
          "orderTimestamp": "2018-12-11T07:30:14.369Z",
          "filledQuantity": 1,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612a4",
          "averagePrice": "1,318.10",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612aa",
          "status": "COMPLETE",
          "quantity": 4,
          "tradingsymbol": "DABUR",
          "brokersymbol": "DABUR",
          "exchange": "NSE",
          "sid": "DABU",
          "transactionType": "BUY",
          "tag": "HyhmBbW8",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 4,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612aa",
          "averagePrice": "412.02",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612b9",
          "status": "COMPLETE",
          "quantity": 6,
          "tradingsymbol": "JSWSTEEL",
          "brokersymbol": "JSWSTEEL",
          "exchange": "NSE",
          "sid": "JSTL",
          "transactionType": "BUY",
          "tag": "lgdyuyGM",
          "orderTimestamp": "2018-12-11T07:30:14.379Z",
          "filledQuantity": 6,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612b9",
          "averagePrice": "297.00",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612bf",
          "status": "COMPLETE",
          "quantity": 7,
          "tradingsymbol": "ITC",
          "brokersymbol": "ITC",
          "exchange": "NSE",
          "sid": "ITC",
          "transactionType": "BUY",
          "tag": "GUpQiL7m",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 7,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612bf",
          "averagePrice": "271.99",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c5",
          "status": "COMPLETE",
          "quantity": 2,
          "tradingsymbol": "TITAN",
          "brokersymbol": "TITAN",
          "exchange": "NSE",
          "sid": "TITN",
          "transactionType": "BUY",
          "tag": "GESHn9YM",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 2,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c5",
          "averagePrice": "914.08",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612a6",
          "status": "COMPLETE",
          "quantity": 4,
          "tradingsymbol": "KANSAINER",
          "brokersymbol": "KANSAINER",
          "exchange": "NSE",
          "sid": "KANE",
          "transactionType": "BUY",
          "tag": "txliNlsm",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 4,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612a6",
          "averagePrice": "452.00",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612bb",
          "status": "COMPLETE",
          "quantity": 2,
          "tradingsymbol": "M&M",
          "brokersymbol": "M&M",
          "exchange": "NSE",
          "sid": "MAHM",
          "transactionType": "BUY",
          "tag": "u22wRvX2",
          "orderTimestamp": "2018-12-11T07:30:14.379Z",
          "filledQuantity": 2,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612bb",
          "averagePrice": "722.06",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612ac",
          "status": "COMPLETE",
          "quantity": 14,
          "tradingsymbol": "IOC",
          "brokersymbol": "IOC",
          "exchange": "NSE",
          "sid": "IOC",
          "transactionType": "BUY",
          "tag": "hsbpEw7i",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 14,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612ac",
          "averagePrice": "130.99",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c1",
          "status": "COMPLETE",
          "quantity": 3,
          "tradingsymbol": "INFY",
          "brokersymbol": "INFY",
          "exchange": "NSE",
          "sid": "INFY",
          "transactionType": "BUY",
          "tag": "aJtwze31",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 3,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c1",
          "averagePrice": "678.04",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c7",
          "status": "COMPLETE",
          "quantity": 18,
          "tradingsymbol": "ASHOKLEY",
          "brokersymbol": "ASHOKLEY",
          "exchange": "NSE",
          "sid": "ASOK",
          "transactionType": "BUY",
          "tag": "JkasZIrw",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 18,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c7",
          "averagePrice": "101.00",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612a8",
          "status": "COMPLETE",
          "quantity": 1,
          "tradingsymbol": "HINDUNILVR",
          "brokersymbol": "HINDUNILVR",
          "exchange": "NSE",
          "sid": "HLL",
          "transactionType": "BUY",
          "tag": "1t1E6nld",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 1,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612a8",
          "averagePrice": "1,805.13",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612bd",
          "status": "COMPLETE",
          "quantity": 7,
          "tradingsymbol": "EXIDEIND",
          "brokersymbol": "EXIDEIND",
          "exchange": "NSE",
          "sid": "EXID",
          "transactionType": "BUY",
          "tag": "AbMBzHMD",
          "orderTimestamp": "2018-12-11T07:30:14.379Z",
          "filledQuantity": 7,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612bd",
          "averagePrice": "249.00",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612ae",
          "status": "COMPLETE",
          "quantity": 1,
          "tradingsymbol": "HDFCBANK",
          "brokersymbol": "HDFCBANK",
          "exchange": "NSE",
          "sid": "HDBK",
          "transactionType": "BUY",
          "tag": "qKRQStp6",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 1,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612ae",
          "averagePrice": "2,055.91",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c3",
          "status": "COMPLETE",
          "quantity": 3,
          "tradingsymbol": "HAVELLS",
          "brokersymbol": "HAVELLS",
          "exchange": "NSE",
          "sid": "HVEL",
          "transactionType": "BUY",
          "tag": "5mXX2YYa",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 3,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c3",
          "averagePrice": "682.96",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c9",
          "status": "COMPLETE",
          "quantity": 2,
          "tradingsymbol": "AUROPHARMA",
          "brokersymbol": "AUROPHARMA",
          "exchange": "NSE",
          "sid": "ARBN",
          "transactionType": "BUY",
          "tag": "IU0Zv7mm",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 2,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c9",
          "averagePrice": "733.95",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      }
  ],
    // name: '', // sc name
  }
}

const buildNormalOUPayload = async (
  referrerName: string | undefined,
  newUserName: string,
  referralCode: string | undefined
) => {
  const shortURL = await shortenerService.getShortedURL(`${referralShortLinkTwitter}${referralCode}`);
  return {
    subject: `Your smallcase order is successful.`,
    referrerName,
    newUserName,
    userDetailsLink: `${REFERRAL_API_URL}/user`,
    utmCampaign: 'user-referral-engine',
    utmContent: 'referrer',
    referralOfferBanner: REFERRAL_OFFER_BANNER,
    referralOfferLearnMoreCTA: `${REFERRAL_API_URL}/refer`,
    referralCode,
    referralLinkTwitter: shortURL,
    date: commonHelper.getShortSCDateString(
      new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
      })
    ),
    orders: [
      {
          "orderId": "5c0f67867d6bb90e4e7612a4",
          "status": "COMPLETE",
          "quantity": 1,
          "tradingsymbol": "ASIANPAINT",
          "brokersymbol": "ASIANPAINT",
          "exchange": "NSE",
          "sid": "ASPN",
          "transactionType": "BUY",
          "tag": "Z96diBp2",
          "orderTimestamp": "2018-12-11T07:30:14.369Z",
          "filledQuantity": 1,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612a4",
          "averagePrice": "1,318.10",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612aa",
          "status": "COMPLETE",
          "quantity": 4,
          "tradingsymbol": "DABUR",
          "brokersymbol": "DABUR",
          "exchange": "NSE",
          "sid": "DABU",
          "transactionType": "BUY",
          "tag": "HyhmBbW8",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 4,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612aa",
          "averagePrice": "412.02",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612b9",
          "status": "COMPLETE",
          "quantity": 6,
          "tradingsymbol": "JSWSTEEL",
          "brokersymbol": "JSWSTEEL",
          "exchange": "NSE",
          "sid": "JSTL",
          "transactionType": "BUY",
          "tag": "lgdyuyGM",
          "orderTimestamp": "2018-12-11T07:30:14.379Z",
          "filledQuantity": 6,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612b9",
          "averagePrice": "297.00",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612bf",
          "status": "COMPLETE",
          "quantity": 7,
          "tradingsymbol": "ITC",
          "brokersymbol": "ITC",
          "exchange": "NSE",
          "sid": "ITC",
          "transactionType": "BUY",
          "tag": "GUpQiL7m",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 7,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612bf",
          "averagePrice": "271.99",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c5",
          "status": "COMPLETE",
          "quantity": 2,
          "tradingsymbol": "TITAN",
          "brokersymbol": "TITAN",
          "exchange": "NSE",
          "sid": "TITN",
          "transactionType": "BUY",
          "tag": "GESHn9YM",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 2,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c5",
          "averagePrice": "914.08",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612a6",
          "status": "COMPLETE",
          "quantity": 4,
          "tradingsymbol": "KANSAINER",
          "brokersymbol": "KANSAINER",
          "exchange": "NSE",
          "sid": "KANE",
          "transactionType": "BUY",
          "tag": "txliNlsm",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 4,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612a6",
          "averagePrice": "452.00",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612bb",
          "status": "COMPLETE",
          "quantity": 2,
          "tradingsymbol": "M&M",
          "brokersymbol": "M&M",
          "exchange": "NSE",
          "sid": "MAHM",
          "transactionType": "BUY",
          "tag": "u22wRvX2",
          "orderTimestamp": "2018-12-11T07:30:14.379Z",
          "filledQuantity": 2,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612bb",
          "averagePrice": "722.06",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612ac",
          "status": "COMPLETE",
          "quantity": 14,
          "tradingsymbol": "IOC",
          "brokersymbol": "IOC",
          "exchange": "NSE",
          "sid": "IOC",
          "transactionType": "BUY",
          "tag": "hsbpEw7i",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 14,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612ac",
          "averagePrice": "130.99",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c1",
          "status": "COMPLETE",
          "quantity": 3,
          "tradingsymbol": "INFY",
          "brokersymbol": "INFY",
          "exchange": "NSE",
          "sid": "INFY",
          "transactionType": "BUY",
          "tag": "aJtwze31",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 3,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c1",
          "averagePrice": "678.04",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c7",
          "status": "COMPLETE",
          "quantity": 18,
          "tradingsymbol": "ASHOKLEY",
          "brokersymbol": "ASHOKLEY",
          "exchange": "NSE",
          "sid": "ASOK",
          "transactionType": "BUY",
          "tag": "JkasZIrw",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 18,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c7",
          "averagePrice": "101.00",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612a8",
          "status": "COMPLETE",
          "quantity": 1,
          "tradingsymbol": "HINDUNILVR",
          "brokersymbol": "HINDUNILVR",
          "exchange": "NSE",
          "sid": "HLL",
          "transactionType": "BUY",
          "tag": "1t1E6nld",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 1,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612a8",
          "averagePrice": "1,805.13",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612bd",
          "status": "COMPLETE",
          "quantity": 7,
          "tradingsymbol": "EXIDEIND",
          "brokersymbol": "EXIDEIND",
          "exchange": "NSE",
          "sid": "EXID",
          "transactionType": "BUY",
          "tag": "AbMBzHMD",
          "orderTimestamp": "2018-12-11T07:30:14.379Z",
          "filledQuantity": 7,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612bd",
          "averagePrice": "249.00",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612ae",
          "status": "COMPLETE",
          "quantity": 1,
          "tradingsymbol": "HDFCBANK",
          "brokersymbol": "HDFCBANK",
          "exchange": "NSE",
          "sid": "HDBK",
          "transactionType": "BUY",
          "tag": "qKRQStp6",
          "orderTimestamp": "2018-12-11T07:30:14.370Z",
          "filledQuantity": 1,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612ae",
          "averagePrice": "2,055.91",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c3",
          "status": "COMPLETE",
          "quantity": 3,
          "tradingsymbol": "HAVELLS",
          "brokersymbol": "HAVELLS",
          "exchange": "NSE",
          "sid": "HVEL",
          "transactionType": "BUY",
          "tag": "5mXX2YYa",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 3,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c3",
          "averagePrice": "682.96",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      },
      {
          "orderId": "5c0f67867d6bb90e4e7612c9",
          "status": "COMPLETE",
          "quantity": 2,
          "tradingsymbol": "AUROPHARMA",
          "brokersymbol": "AUROPHARMA",
          "exchange": "NSE",
          "sid": "ARBN",
          "transactionType": "BUY",
          "tag": "IU0Zv7mm",
          "orderTimestamp": "2018-12-11T07:30:14.380Z",
          "filledQuantity": 2,
          "exchangeOrderId": "5b4f1746bb3a15446095967e5c0f67867d6bb90e4e7612c9",
          "averagePrice": "733.95",
          "statusMessage": "NA",
          "error": false,
          "buy": true
      }
  ],
  // name: '', // sc name
  }
}

export const buildNotificationPayload = (
  jobName: string,
  referrerName: string | undefined,
  newUserName: string,
  referralCode: string | undefined,
) => {
  let payload = {};
  switch (jobName) {
    case 'orderUpdatesWithOfferForReferrer':
      payload = buildReferrerPayload(referrerName, newUserName);
      break;
    case 'orderUpdatesWithOfferForNewUser':
      payload = buildPayloadForNewUser(referrerName, newUserName, referralCode);
      break;
    case 'orderUpdatesWithOffer':
      payload = buildNormalOUPayload(referrerName, newUserName, referralCode);
      break;  
    default:
      break;
  }

  return payload;
}

export const sendOUEmailNotification = (
  data: {
    jobName: string,
    subset: string,
    userId: string,
    toAddress: string,
    referralCode?: string,
    smallbucksEarned?: number,
    referrerName?: string,
    newUserName: string,
  }
) => {
  const url = `${notificationProducerURL}/api/v1/cmd/all`;
  const { jobName, userId, toAddress, subset, referrerName, newUserName, referralCode } = data;

  const reqData = {
    method: 'POST' as Method,
    url,
    config: { withCredentials: true },
    headers: { 'Content-Type': 'application/json' },
    data: {
      flowName: jobName,
      notificationTypes: ['emailNotification'],
      userSubset: subset,
      lock: {
        key: `${jobName}:${userId}`,
        ttl: 1,
      },
      payload: {
        emailNotification: {
          userId,
          user: {
            toAddress,
          },
          templateData: buildNotificationPayload(jobName, referrerName, newUserName, referralCode),
        }
      }
    }
  }

  return networkHelper.performHTTPRequest(reqData)
    .then((res) => {
      const resp = res.data;
      console.log('resp: ', resp);
      return resp;
    })
    .catch((err) => Promise.reject(err));
}
