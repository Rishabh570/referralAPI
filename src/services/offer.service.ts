import { nanoid } from 'nanoid';
import { offerCodeLength } from "../config/config";

export const generateOfferCode = (codeLen = offerCodeLength) => {
  return nanoid(codeLen);
}