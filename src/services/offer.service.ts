import { nanoid } from 'nanoid';
import { offerCodeLength } from "../config/config";

export const generateOfferCode = () => {
  return nanoid(offerCodeLength);
}