
export default async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:3000/v1/categories");
        if (!response.ok) {
            throw new Error
        }
        const data = await response.json();
        console.log(data);
    } catch {
        console.error("An error occured. API fetch failed");
    }
}


await fetchCategories();