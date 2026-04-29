/**
 * The SolutionsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/SolutionsService');
const solutionsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.solutionsGET);
};

const solutionsIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.solutionsIdDELETE);
};

const solutionsIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.solutionsIdGET);
};

const solutionsIdHelpfulPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.solutionsIdHelpfulPOST);
};

const solutionsIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.solutionsIdPUT);
};

const solutionsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.solutionsPOST);
};

const subcategoriesSlugSolutionsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.subcategoriesSlugSolutionsGET);
};


module.exports = {
  solutionsGET,
  solutionsIdDELETE,
  solutionsIdGET,
  solutionsIdHelpfulPOST,
  solutionsIdPUT,
  solutionsPOST,
  subcategoriesSlugSolutionsGET,
};
