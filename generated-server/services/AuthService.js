/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Login
*
* loginInput LoginInput 
* no response value expected for this operation
* */
const authLoginPOST = ({ loginInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        loginInput,
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
* Register
*
* registerInput RegisterInput 
* returns UserPublic
* */
const authRegisterPOST = ({ registerInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        registerInput,
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
  authLoginPOST,
  authRegisterPOST,
};
