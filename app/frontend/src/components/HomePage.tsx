import { useEffect, useState } from "react";
import GetCategories from "../../../backend/src/categories";
import { Category } from "solutions-api-sdk";

export default function App() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        GetCategories()
            .then((category) => setCategories(category));
    }, []);

    return <div>
        {categories.map((category, i) => (
            <div key={i}>ID: {category.id} Name: {category.name} </div>
        ))}
    </div>
}