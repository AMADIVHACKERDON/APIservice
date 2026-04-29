import express from "express";
import * as APIs from "./test-api.ts";

const app = express();
app.use(express.json());
const PORT = 3000;

// List categories
app.get("/v1/categories", APIs.getCategories);

// Get category
app.get("/v1/categories/:slug", APIs.getCategoryBySlug);

// Solutions under category
app.get("/v1/categories/:slug/solutions", APIs.getSolutionsByCategory);

// List subcategories
app.get("/v1/subcategories", APIs.getSubcategories);

// Get subcategory
app.get("/v1/subcategories/:slug", APIs.getSubcategoryBySlug);

// Solutions under subcategory
app.get("/v1/subcategories/:slug/solutions", APIs.getSolutionsBySubcategory);

// List solutions
app.get("/v1/solutions", APIs.getSolutions);

// Create solution
app.post("/v1/solutions", APIs.createSolution);

// Get solution
app.get("/v1/solutions/:id", APIs.getSolutionById);

// Update solution
app.put("/v1/solutions/:id", APIs.updateSolution);

// Delete solution
app.delete("/v1/solutions/:id", APIs.deleteSolution);

// Mark solution helpful
app.post("/v1/solutions/:id/helpful", APIs.markSolutionHelpful);

// Register
app.post("/v1/auth/register", APIs.registerUser);

// Login
app.post("/v1/auth/login", APIs.loginUser);

// Get API key
app.get("/v1/me/api-key", APIs.getApiKey);

// Regenerate API key
app.post("/v1/me/api-key/regenerate", APIs.regenerateApiKey);

app.listen(PORT, () => {
    console.log(`🚀 Solutions API live at http://localhost:${PORT}`);
});