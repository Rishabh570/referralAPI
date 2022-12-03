import { Method } from 'axios';
import { notificationProducerURL } from '../config/config';
import { performHTTPRequest } from '../helpers/network.helper';

export const sendOUEmailNotification = (userId: string, toAddress: string, offerCode: string, userName: string) => {
  const url = `${notificationProducerURL}/api/v1/cmd/all`;

  const reqData = {
    method: 'POST' as Method,
    url,
    config: { withCredentials: true },
    headers: { 'Content-Type': 'application/json' },
    data: {
      flowName: 'orderUpdatesWithOffer',
      notificationTypes: ['emailNotification'],
      userSubset: 'default',
      payload: {
        emailNotification: {
          userId,
          user: {
            toAddress,
          },
          templateData: {
            offerCode,
            name: userName,
            // TODO: other OU email payload details
          },
        }
      }
    }
  }

  return performHTTPRequest(reqData)
    .then((res) => {
      const resp = res.data;
      console.log('resp: ', resp);
      return resp;
    })
    .catch((err) => Promise.reject(err));
}
