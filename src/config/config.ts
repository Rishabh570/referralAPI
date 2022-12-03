export const PORT = process.env.SERVER_PORT
export const authToken = process.env.authToken || 'secretAuthTokenValue';
export const shortenerAPIURL = process.env.shortenerAPIURL || 'http://localhost';
export const notificationProducerURL = process.env.notificationProducerURL || 'http://localhost';
export const offerCodeLength = 12;
export const smallbucksMultiplier = 10;
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