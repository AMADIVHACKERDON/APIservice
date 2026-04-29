/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Get API key
*
* no response value expected for this operation
* */
const meApiKeyGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Regenerate API key
*
* no response value expected for this operation
* */
const meApiKeyRegeneratePOST = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  meApiKeyGET,
  meApiKeyRegeneratePOST,
};
