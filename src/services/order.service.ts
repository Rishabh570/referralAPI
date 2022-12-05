import { authToken, ORDER_API_URL } from "../config/config";
import { performHTTPRequest } from "../helpers/network.helper";

export const placeOrderOnExchange = () => {
  const URL = `${ORDER_API_URL}/orders/placeOrder`;

  return performHTTPRequest({
    method: 'POST',
    url: URL,
    config: { withCredentials: true },
    headers: { 'Content-Type': 'application/json', 'x-sc-authorization': authToken },
  })
    .then((res) => {
      const resp = res.data;
      console.log('[ORDER API] response: ', resp);
      return resp;
    })
    .catch((err) => Promise.reject(err));
}