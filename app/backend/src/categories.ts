import { CategoriesApi } from "../../generated-api/api/categories-api.ts";

export default async function GetCategories() {
    const categoryAPI = new CategoriesApi();
    const categories = await categoryAPI.getCategories();
    const { data } = categories.data;
    return data;
}