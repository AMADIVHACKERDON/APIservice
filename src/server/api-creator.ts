// import express from "express";
// import type { Request, Response } from "express";

// const app = express();
// const PORT = 3000;

// app.get("/v1/categories", categories);
// function categories(req:Request, res:Response) {
//     res.json({ message: "Success" });
// }

// app.listen(PORT, reply);
// function reply() {
//     console.log(`Server running on port ${PORT}`);
// }


import { CategoriesApi, Configuration } from "../../generated-server/api/apis.js";

// 1. Create a configuration object
const config = new Configuration({
    basePath: "http://localhost:3000"
});

// 2. Pass the config to the API constructor
const catAPI = new CategoriesApi(config);

try {
    // 3. Axios responses store the data in the '.data' property
    const res = await catAPI.categoriesGet();
    
    // Log the actual JSON body returned by your server
    console.log(res.data);
} catch (error) {
    console.error("Failed to fetch:", error);
}





