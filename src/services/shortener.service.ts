import { shortenerAPIURL } from '../config/config';
import { performHTTPRequest } from '../helpers/network.helper';

export const getShortedURL = (originalLink: string) => {
  const shortenerURL = `${shortenerAPIURL}/shortenUrl`;

  return performHTTPRequest({
    method: 'POST',
    url: shortenerURL,
    config: { withCredentials: true },
    headers: { 'Content-Type': 'application/json' },
    data: { url: originalLink }
  })
    .then((res) => {
      const resp = res.data;
      const { shortUrl } = JSON.parse(resp);
      console.log('shortUrl: ', shortUrl);
      return shortUrl;
    })
    .catch((err) => Promise.reject(err));
}
