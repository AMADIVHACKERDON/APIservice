import { CategoriesApi } from "solutions-api-sdk/api/categories-api.ts";
import { SolutionsApi } from "solutions-api-sdk/api/solutions-api.ts";
import { AuthApi } from "solutions-api-sdk/api/auth-api.ts";
import { DeveloperApi } from "solutions-api-sdk/api/developer-api.ts";

export async function GetCategories() {
    const api = new CategoriesApi();
    const res = await api.getCategories();
    return res.data.data;
}

export async function GetCategoryBySlug({ slug }: { slug: string }) {
    const api = new CategoriesApi();

    const res = await api.getCategoryBySlug({
        slug,
    });

    return res.data;
}

export async function GetSolutionsByCategory({
    slug,
    page = 1,
    limit = 20,
}: {
    slug: string;
    page?: number;
    limit?: number;
}) {
    const api = new CategoriesApi();

    const res = await api.getSolutionsByCategory({
        slug,
        page,
        limit,
    });

    return res.data;
}

export async function GetSubcategories() {
    const api = new CategoriesApi();
    const res = await api.getSubcategories();

    return res.data.data;
}

export async function GetSubcategoryBySlug({ slug }: { slug: string }) {
    const api = new CategoriesApi();

    const res = await api.getSubcategoryBySlug({
        slug,
    });

    return res.data;
}

export async function GetSolutionsBySubcategory({
    slug,
    page = 1,
    limit = 20,
}: {
    slug: string;
    page?: number;
    limit?: number;
}) {
    const api = new SolutionsApi();

    const res = await api.getSolutionsBySubcategory({
        slug,
        page,
        limit,
    });

    return res.data;
}

export async function GetSolutions({
    search,
    subcategory,
    page = 1,
    limit = 20,
}: {
    search?: string;
    subcategory?: string;
    page?: number;
    limit?: number;
}) {
    const api = new SolutionsApi();

    const res = await api.getSolutions({
        search,
        subcategory,
        page,
        limit,
    });

    return res.data;
}

export async function CreateSolution() {
    const api = new SolutionsApi();

    const res = await api.createSolution({
        solutionInput: {
            title: "Fix CORS issue",
            content: "Enable cors middleware in express",
            subcategory_id: "2",
            difficulty: "beginner",
        },
    });

    return res.data;
}

export async function GetSolutionById({ id }: { id: string }) {
    const api = new SolutionsApi();

    const res = await api.getSolutionById({
        id,
    });

    return res.data;
}

export async function UpdateSolution({
    id,
    solutionInput,
}: {
    id: string;
    solutionInput?: any;
}) {
    const api = new SolutionsApi();

    const res = await api.updateSolution({
        id,
        solutionInput: solutionInput ?? {
            title: "Updated title",
            content: "Updated content",
            subcategory_id: "2",
            difficulty: "advanced",
        },
    });

    return res.data;
}

export async function DeleteSolution({ id }: { id: string }) {
    const api = new SolutionsApi();

    const res = await api.deleteSolution({
        id,
    });

    return res.data;
}

export async function MarkSolutionHelpful({ id }: { id: string }) {
    const api = new SolutionsApi();

    const res = await api.markSolutionHelpful({
        id,
    });

    return res.data;
}

export async function RegisterUser() {
    const api = new AuthApi();

    const res = await api.registerUser({
        registerInput: {
            username: "emma",
            email: "emma@example.com",
            password: "password123",
        },
    });

    return res.data;
}

export async function LoginUser() {
    const api = new AuthApi();

    const res = await api.loginUser({
        loginInput: {
            email: "emma@example.com",
            password: "password123",
        },
    });

    return res.data;
}

export async function GetApiKey() {
    const api = new DeveloperApi();

    const res = await api.getApiKey();

    return res.data;
}

export async function RegenerateApiKey() {
    const api = new DeveloperApi();

    const res = await api.regenerateApiKey();

    return res.data;
}