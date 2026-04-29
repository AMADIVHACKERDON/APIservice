import express from "express";
import * as APIs from ./test-api.js;
import * as Models from "/home/runner/work/APIservice/APIservice/generated-api/models/index.ts";

const app = express();
app.use(express.json());
const PORT = 3000;

// List categories
app.get("/categories", APIs.getCategories);

// Get category
app.get("/categories/:slug", APIs.getCategoryBySlug);

// Solutions under category
app.get("/categories/:slug/solutions", APIs.getSolutionsByCategory);

// List subcategories
app.get("/subcategories", APIs.getSubcategories);

// Get subcategory
app.get("/subcategories/:slug", APIs.getSubcategoryBySlug);

// Solutions under subcategory
app.get("/subcategories/:slug/solutions", APIs.getSolutionsBySubcategory);

// List solutions
app.get("/solutions", APIs.getSolutions);

// Create solution
app.post("/solutions", APIs.createSolution);

// Get solution
app.get("/solutions/:id", APIs.getSolutionById);

// Update solution
app.put("/solutions/:id", APIs.updateSolution);

// Delete solution
app.delete("/solutions/:id", APIs.deleteSolution);

// Mark solution helpful
app.post("/solutions/:id/helpful", APIs.markSolutionHelpful);

// Register
app.post("/auth/register", APIs.registerUser);

// Login
app.post("/auth/login", APIs.loginUser);

// Get API key
app.get("/me/api-key", APIs.getApiKey);

// Regenerate API key
app.post("/me/api-key/regenerate", APIs.regenerateApiKey);

app.listen(PORT, () => {
    console.log(`🚀 Solutions API live at http://localhost:${PORT}`);
});