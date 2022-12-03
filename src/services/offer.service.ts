import { offerCodeLength } from "../config/config";

const nanoid = require('nanoid');

export const generateOfferCode = () => {
  return nanoid(offerCodeLength);
}