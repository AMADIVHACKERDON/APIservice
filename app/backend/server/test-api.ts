import type { Request, Response } from "express";
import * as Data from "../data/testData.ts";

function wrap<ANY>(data: ANY) {
    return { data };
}

/* ─────────────────────────────
   CATEGORIES
───────────────────────────── */

export function getCategories(req: Request, res: Response) {
    res.send(wrap(Data.categories));
}

export function getCategoryBySlug(req: Request, res: Response) {
    const category = Data.categories.find(
        c => c.slug === req.params.slug
    );

    if (!category) return res.status(404).send();

    res.send(wrap(category));
}

/* ─────────────────────────────
   SOLUTIONS BY CATEGORY (FIXED)
───────────────────────────── */

export function getSolutionsByCategory(req: Request, res: Response) {
    const { slug } = req.params;

    const category = Data.categories.find(c => c.slug === slug);
    if (!category) return res.status(404).send(wrap([]));

    const subIds = Data.subcategories
        .filter(s => s.category_id === category.id)
        .map(s => s.id);

    const solutions = Data.solutions.filter(s =>
        subIds.includes(s.subcategory_id)
    );

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const paginated = solutions.slice(
        (page - 1) * limit,
        page * limit
    );

    res.send({
        page,
        limit,
        total: solutions.length,
        data: paginated,
    });
};

/* ─────────────────────────────
   SUBCATEGORIES
───────────────────────────── */

export function getSubcategories(req: Request, res: Response) {
    res.send(wrap(Data.subcategories));
}

export function getSubcategoryBySlug(req: Request, res: Response) {
    const sub = Data.subcategories.find(
        s => s.slug === req.params.slug
    );

    if (!sub) return res.status(404).send();

    res.send(wrap(sub));
}

/* ─────────────────────────────
   SOLUTIONS BY SUBCATEGORY (FIXED)
───────────────────────────── */

export function getSolutionsBySubcategory(req: Request, res: Response) {
    const sub = Data.subcategories.find(
        s => s.slug === req.params.slug
    );

    if (!sub) return res.status(404).send(wrap([]));

    const solutions = Data.solutions.filter(
        s => s.subcategory_id === sub.id
    );

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const paginated = solutions.slice(
        (page - 1) * limit,
        page * limit
    );

    res.send({
        page,
        limit,
        total: solutions.length,
        data: paginated,
    });
};

/* ─────────────────────────────
   SOLUTIONS
───────────────────────────── */

export function getSolutions(req: Request, res: Response) {
    const { search, subcategory } = req.query;

    let results = Data.solutions;

    if (subcategory) {
        results = results.filter(
            s => s.subcategory_id === subcategory
        );
    }

    if (search) {
        const q = String(search).toLowerCase();
        results = results.filter(
            s =>
                s.title.toLowerCase().includes(q) ||
                s.content.toLowerCase().includes(q)
        );
    }

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const paginated = results.slice(
        (page - 1) * limit,
        page * limit
    );

    res.send({
        page,
        limit,
        total: results.length,
        data: paginated,
    });
};

export function createSolution(req: Request, res: Response) {
    res.status(201).send(wrap(req.body));
}

/* ─────────────────────────────
   SOLUTION BY ID (FIXED 404)
───────────────────────────── */

export function getSolutionById(req: Request, res: Response) {
    const solution = Data.solutions.find(
        s => s.id === req.params.id
    );

    if (!solution) return res.status(404).send();

    res.send(wrap(solution));
}

/* ─────────────────────────────
   UPDATE / DELETE
───────────────────────────── */

export function updateSolution(req: Request, res: Response) {
    res.send(wrap({
        id: req.params.id,
        ...req.body,
    }));
}

export function deleteSolution(req: Request, res: Response) {
    res.status(204).send();
}

/* ─────────────────────────────
   HELPFUL (FIXED MUTATION)
───────────────────────────── */

export function markSolutionHelpful(req: Request, res: Response) {
    const solution = Data.solutions.find(
        s => s.id === req.params.id
    );

    if (!solution) return res.status(404).send();

    solution.helpful_count = (solution.helpful_count || 0) + 1;

    res.send(wrap({
        id: solution.id,
        helpful_count: solution.helpful_count,
    }));
}

/* ─────────────────────────────
   AUTH (unchanged mock)
───────────────────────────── */

export function registerUser(req: Request, res: Response) {
    res.status(201).send(wrap({
        id: "1",
        username: req.body.username,
    }));
}

export function loginUser(req: Request, res: Response) {
    res.send(wrap({
        token: "sample-token",
    }));
}

/* ─────────────────────────────
   API KEYS
───────────────────────────── */

export function getApiKey(req: Request, res: Response) {
    res.send(wrap({
        api_key: "sample-api-key",
    }));
}

export function regenerateApiKey(req: Request, res: Response) {
    res.send(wrap({
        api_key: "new-sample-api-key",
    }));
}