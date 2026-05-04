import express from "express";
import * as APIs from "./test-api.ts";

const app = express();
app.use(express.json());
const PORT = 3000;

// List categories
app.get("api/v1/categories", APIs.getCategories);

// Get category
app.get("api/v1/categories/:slug", APIs.getCategoryBySlug);

// Solutions under category
app.get("api/v1/categories/:slug/solutions", APIs.getSolutionsByCategory);

// List subcategories
app.get("api/v1/subcategories", APIs.getSubcategories);

// Get subcategory
app.get("api/v1/subcategories/:slug", APIs.getSubcategoryBySlug);

// Solutions under subcategory
app.get("api/v1/subcategories/:slug/solutions", APIs.getSolutionsBySubcategory);

// List solutions
app.get("api/v1/solutions", APIs.getSolutions);

// Create solution
app.post("api/v1/solutions", APIs.createSolution);

// Get solution
app.get("api/v1/solutions/:id", APIs.getSolutionById);

// Update solution
app.put("api/v1/solutions/:id", APIs.updateSolution);

// Delete solution
app.delete("api/v1/solutions/:id", APIs.deleteSolution);

// Mark solution helpful
app.post("api/v1/solutions/:id/helpful", APIs.markSolutionHelpful);

// Register
app.post("api/v1/auth/register", APIs.registerUser);

// Login
app.post("api/v1/auth/login", APIs.loginUser);

// Get API key
app.get("api/v1/me/api-key", APIs.getApiKey);

// Regenerate API key
app.post("api/v1/me/api-key/regenerate", APIs.regenerateApiKey);

app.listen(PORT, () => {
    console.log(`🚀 Solutions API live at http://localhost:${PORT}`);
});