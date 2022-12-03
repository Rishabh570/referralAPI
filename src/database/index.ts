import * as mongo from './mongo';

export const init = async (): Promise<void> => {
  await mongo.getMongoConn();
};
