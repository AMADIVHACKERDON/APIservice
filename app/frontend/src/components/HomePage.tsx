import { CategoriesApi } from "../../../generated-api/api/categories-api";


export default async function HomePage() {
    const categoriesAPI = new CategoriesApi();
    const categories = await categoriesAPI.getCategories();
    
    const { data } = categories;
    console.log(data);
}