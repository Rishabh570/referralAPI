import * as config from '../config/config';
import mongoose from 'mongoose';

const logger = console;
let mongoClient: mongoose.Connection;

export const getMongoConn = async (): Promise<mongoose.Connection | undefined> => {
  if (!mongoClient) {
    mongoose.connection.on('open', function () {
      logger.debug(`mongodb: 'open'`);
    });
    mongoose.connection.on('connected', function () {
      logger.debug('mongodb: "connected"');
    });
    mongoose.connection.on('error', function (err) {
      logger.error(err);
    });
    mongoose.connection.on('reconnected', function () {
      logger.debug(`mongodb: 'reconnected'`);
    });
    mongoose.connection.on('disconnecting', function () {
      logger.debug(`mongodb: 'disconnecting'`);
    });
    mongoose.connection.on('disconnected', function () {
      logger.debug(`mongodb: 'disconnected'`);
    });
    mongoose.connection.on('close', function () {
      logger.debug(`mongodb: 'close'`);
    });
    mongoose
      .connect(config.mongoConfig.dbURI, config.mongoConfig.dbOptions)
      .then((conn) => {
        logger.debug(`mongo connected ${conn.connections[0].name}`);
      })
      .catch((error) => {
        logger.error(error);
      });

    if (config.showDebugLogs)
      mongoose.set('debug', (coll: string, method: string, query: string) => {
        logger.info(`${coll}.${method}`, { extra: { query } });
      });

    mongoClient = mongoose.connection;
    return mongoClient;
  }
};

export const stop = (): Promise<void> | undefined => {
  if (mongoClient) {
    return mongoClient.close();
  }
};

export const getMongoTransaction = () => {
  return mongoClient.startSession();
};
