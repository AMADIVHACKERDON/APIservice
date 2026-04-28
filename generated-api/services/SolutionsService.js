/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List solutions
* Search across title and content, optionally filter by subcategory
*
* search oas_any_type_not_mapped  (optional)
* subcategory oas_any_type_not_mapped Subcategory ID filter (optional)
* page oas_any_type_not_mapped  (optional)
* limit oas_any_type_not_mapped  (optional)
* returns PaginatedSolutions
* */
const solutionsGET = ({ search, subcategory, page, limit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        search,
        subcategory,
        page,
        limit,
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
* Delete solution
*
* id oas_any_type_not_mapped 
* no response value expected for this operation
* */
const solutionsIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
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
* Get solution
*
* id oas_any_type_not_mapped 
* returns Solution
* */
const solutionsIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
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
* Mark solution helpful
*
* id oas_any_type_not_mapped 
* returns _solutions__id__helpful_post_200_response
* */
const solutionsIdHelpfulPOST = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
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
* Update solution
*
* id oas_any_type_not_mapped 
* solutionInput SolutionInput 
* returns Solution
* */
const solutionsIdPUT = ({ id, solutionInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        solutionInput,
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
* Create solution
*
* solutionInput SolutionInput 
* returns Solution
* */
const solutionsPOST = ({ solutionInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        solutionInput,
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
* Solutions under subcategory
*
* slug oas_any_type_not_mapped 
* page oas_any_type_not_mapped  (optional)
* limit oas_any_type_not_mapped  (optional)
* returns PaginatedSolutions
* */
const subcategoriesSlugSolutionsGET = ({ slug, page, limit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        slug,
        page,
        limit,
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
  solutionsGET,
  solutionsIdDELETE,
  solutionsIdGET,
  solutionsIdHelpfulPOST,
  solutionsIdPUT,
  solutionsPOST,
  subcategoriesSlugSolutionsGET,
};
