/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List categories
*
* returns oas_any_type_not_mapped
* */
const categoriesGET = () => new Promise(
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
* Get category
*
* slug oas_any_type_not_mapped 
* returns Category
* */
const categoriesSlugGET = ({ slug }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        slug,
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
* Solutions under category
*
* slug oas_any_type_not_mapped 
* page oas_any_type_not_mapped  (optional)
* limit oas_any_type_not_mapped  (optional)
* returns PaginatedSolutions
* */
const categoriesSlugSolutionsGET = ({ slug, page, limit }) => new Promise(
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
/**
* List subcategories
*
* returns oas_any_type_not_mapped
* */
const subcategoriesGET = () => new Promise(
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
* Get subcategory
*
* slug oas_any_type_not_mapped 
* returns Subcategory
* */
const subcategoriesSlugGET = ({ slug }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        slug,
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
  categoriesGET,
  categoriesSlugGET,
  categoriesSlugSolutionsGET,
  subcategoriesGET,
  subcategoriesSlugGET,
};
