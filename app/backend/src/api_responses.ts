import { CategoriesApi } from "solutions-api-sdk/api/categories-api.ts";
import { SolutionsApi } from "solutions-api-sdk/api/solutions-api.ts";
import { AuthApi } from "solutions-api-sdk/api/auth-api.ts";
import { DeveloperApi } from "solutions-api-sdk/api/developer-api.ts";

export async function GetCategories() {
    const categoryAPI = new CategoriesApi();
    const categories = await categoryAPI.getCategories();
    const { data } = categories.data;

    return data;
}

export async function GetCategoryBySlug() {
    const categoryAPI = new CategoriesApi();
    const category = await categoryAPI.getCategoryBySlug({
        slug: "web-dev",
    });

    return category.data;
}

export async function GetSolutionsByCategory() {
    const categoryAPI = new CategoriesApi();
    const solutions = await categoryAPI.getSolutionsByCategory({
        slug: "web-dev",
        page: 1,
        limit: 20,
    });

    return solutions.data;
}

export async function GetSubcategories() {
    const categoryAPI = new CategoriesApi();
    const subcategories = await categoryAPI.getSubcategories();
    const { data } = subcategories.data;

    return data;
}

export async function GetSubcategoryBySlug() {
    const categoryAPI = new CategoriesApi();
    const subcategory = await categoryAPI.getSubcategoryBySlug({
        slug: "frontend",
    });

    return subcategory.data;
}

export async function GetSolutionsBySubcategory() {
    const solutionsAPI = new SolutionsApi();
    const solutions = await solutionsAPI.getSolutionsBySubcategory({
        slug: "frontend",
        page: 1,
        limit: 20,
    });

    return solutions.data;
}

export async function GetSolutions() {
    const solutionsAPI = new SolutionsApi();
    const solutions = await solutionsAPI.getSolutions({
        search: "cors",
        subcategory: "1",
        page: 1,
        limit: 20,
    });

    return solutions.data;
}

export async function CreateSolution() {
    const solutionsAPI = new SolutionsApi();

    const solution = await solutionsAPI.createSolution({
        'solutionInput': {
                title: "Fix CORS issue",
                content: "Enable cors middleware in express",
                subcategory_id: "2",
                difficulty: "beginner",
            }
    })
    return solution.data;
}

export async function GetSolutionById() {
    const solutionsAPI = new SolutionsApi();

    const solution = await solutionsAPI.getSolutionById({
        id: "1",
    });

    return solution.data;
}

export async function UpdateSolution({ id }: any) {
    const solutionsAPI = new SolutionsApi();

    const solution = await solutionsAPI.updateSolution({
        id: id,
        solutionInput:{
            title: "Updated title",
            content: "Updated content",
            subcategory_id: "2",
            difficulty: "advanced",
        }
    }
    );

    return solution.data;
}

export async function DeleteSolution() {
    const solutionsAPI = new SolutionsApi();

    const response = await solutionsAPI.deleteSolution({
        id: "1",
    });

    return response.data;
}

export async function MarkSolutionHelpful() {
    const solutionsAPI = new SolutionsApi();

    const response = await solutionsAPI.markSolutionHelpful({
        id: "1",
    });

    return response.data;
}

export async function RegisterUser() {
    const authAPI = new AuthApi();

    const user = await authAPI.registerUser({
        registerInput: {
            username: "emma",
            email: "emma@example.com",
            password: "password123",
        }
    });

    return user.data;
}

export async function LoginUser() {
    const authAPI = new AuthApi();

    const token = await authAPI.loginUser({
        loginInput: {
            email: "emma@example.com",
            password: "password123",
        }
    });

    return token.data;
}

export async function GetApiKey() {
    const developerAPI = new DeveloperApi();

    const apiKey = await developerAPI.getApiKey();

    return apiKey.data;
}

export async function RegenerateApiKey() {
    const developerAPI = new DeveloperApi();

    const apiKey = await developerAPI.regenerateApiKey();

    return apiKey.data;
}