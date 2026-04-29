export * from './authApi';
import { AuthApi } from './authApi';
export * from './categoriesApi';
import { CategoriesApi } from './categoriesApi';
export * from './developerApi';
import { DeveloperApi } from './developerApi';
export * from './solutionsApi';
import { SolutionsApi } from './solutionsApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [AuthApi, CategoriesApi, DeveloperApi, SolutionsApi];
