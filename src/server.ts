import express from "express";
import * as Controllers from "./controllers.js";
import * as Models from "../generated-api/models/index.js";

const app = express();
app.use(express.json());
const PORT = 3000;

// List categories
app.get("/categories", Controllers.getCategories);
// Get category
app.get("/categories/:slug", Controllers.getCategoryBySlug);
// Solutions under category
app.get("/categories/:slug/solutions", Controllers.getSolutionsByCategory);
// List subcategories
app.get("/subcategories", Controllers.getSubcategories);
// Get subcategory
app.get("/subcategories/:slug", Controllers.getSubcategoryBySlug);
// Solutions under subcategory
app.get("/subcategories/:slug/solutions", Controllers.getSolutionsBySubcategory);
// List solutions
app.get("/solutions", Controllers.getSolutions);
// Create solution
app.post("/solutions", Controllers.createSolution);
// Get solution
app.get("/solutions/:id", Controllers.getSolutionById);
// Update solution
app.put("/solutions/:id", Controllers.updateSolution);
// Delete solution
app.delete("/solutions/:id", Controllers.deleteSolution);
// Mark solution helpful
app.post("/solutions/:id/helpful", Controllers.markSolutionHelpful);
// Register
app.post("/auth/register", Controllers.registerUser);
// Login
app.post("/auth/login", Controllers.loginUser);
// Get API key
app.get("/me/api-key", Controllers.getApiKey);
// Regenerate API key
app.post("/me/api-key/regenerate", Controllers.regenerateApiKey);

app.listen(PORT, () => {
    console.log(`🚀 Solutions API live at http://localhost:${PORT}`);
});