//OPTIONAL FILE: configure test for the server
import type { Request, Response } from "express";
import * as Data from "../data/allData.ts";

export function getCategories(request: Request, response: Response){
    // Logic for getCategories
    response.send({ data: Data.categories });
}

export function getCategoryBySlug(request: Request, response: Response){
    // Logic for getCategoryBySlug

    const category = Data.categories.find(
        category => category.slug === request.params.slug
    );

    if(!category){
        response.status(404).send();
        return;
    }

    response.send(category);
}

export function getSolutionsByCategory(request: Request, response: Response){
    // Logic for getSolutionsByCategory

    response.send({
        page: Number(request.query.page || 1),
        limit: Number(request.query.limit || 20),
        total: Data.solutions.length,
        data: Data.solutions,
    });
}

export function getSubcategories(request: Request, response: Response){
    // Logic for getSubcategories

    response.send({ data: Data.subcategories });
}

export function getSubcategoryBySlug(request: Request, response: Response){
    // Logic for getSubcategoryBySlug

    const subcategory = Data.subcategories.find(
        subcategory => subcategory.slug === request.params.slug
    );

    if(!subcategory){
        response.status(404).send();
        return;
    }

    response.send(subcategory);
}

export function getSolutionsBySubcategory(request: Request, response: Response){
    // Logic for getSolutionsBySubcategory

    response.send({
        page: Number(request.query.page || 1),
        limit: Number(request.query.limit || 20),
        total: Data.solutions.length,
        data: Data.solutions,
    });
}

export function getSolutions(request: Request, response: Response){
    // Logic for getSolutions

    response.send({
        page: Number(request.query.page || 1),
        limit: Number(request.query.limit || 20),
        total: Data.solutions.length,
        data: Data.solutions,
    });
}

export function createSolution(request: Request, response: Response){
    // Logic for createSolution

    response.status(201).send(request.body);
}

export function getSolutionById(request: Request, response: Response){
    // Logic for getSolutionById

    const solution = Data.solutions.find(
        solution => solution.id === request.params.id
    );

    response.send(solution);
}

export function updateSolution(request: Request, response: Response){
    // Logic for updateSolution

    response.send({
        id: request.params.id,
        ...request.body,
    });
}

export function deleteSolution(request: Request, response: Response){
    // Logic for deleteSolution

    response.status(204).send();
}

export function markSolutionHelpful(request: Request, response: Response){
    // Logic for markSolutionHelpful

    response.send({
        id: request.params.id,
        helpful_count: 1,
    });
}

export function registerUser(request: Request, response: Response){
    // Logic for registerUser

    response.status(201).send({
        id: "1",
        username: request.body.username,
    });
}

export function loginUser(request: Request, response: Response){
    // Logic for loginUser

    response.send({
        token: "sample-token",
    });
}

export function getApiKey(request: Request, response: Response){
    // Logic for getApiKey

    response.send({
        api_key: "sample-api-key",
    });
}

export function regenerateApiKey(request: Request, response: Response){
    // Logic for regenerateApiKey

    response.send({
        api_key: "new-sample-api-key",
    });
}