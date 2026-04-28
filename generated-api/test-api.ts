import { Category } from "./models";
import { CategoriesApi } from "./api";


const category: Category[] = [
    {
        id: "1",
        name: "iot",
        slug: "iot-cat"
    },
    {
        id: "2",
        name: "AI",
        slug: "ai"
    },
    {
        id: "3",
        name: "web",
        slug: "web-dev"
    },
];


const api = new CategoriesApi();

try {
    // Top-level await (allowed with the tsconfig settings discussed)
    const response = await api.categoriesGet();
    
    // The data is usually inside response.data when using Axios
    console.log(response.data);
} catch (error) {
    console.error("Failed to fetch categories:", error);
}



