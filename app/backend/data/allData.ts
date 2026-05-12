import * as Models from "../../generated-api/models/index.js";

export const categories: Models.Category[] = [
    { id: "1", name: "web dev", slug: "web-dev" },
    { id: "1", name: "iot", slug: "iot" },
    { id: "1", name: "Machine Learning", slug: "machine-learning" },
];

export const subcategories: Models.Subcategory[] = [
    {
        id: "1",
        name: "frontend",
        slug: "frontend",
        category_id: "1",
    },
    {
        id: "2",
        name: "backend",
        slug: "backend",
        category_id: "1",
    },
    {
        id: "3",
        name: "embedded systems",
        slug: "embedded-systems",
        category_id: "1",
    },
];

export const solutions: Models.Solution[] = [
    {
        id: "1",
        title: "Fix CORS issue",
        content: "Enable cors middleware in express",
        difficulty: "beginner",
        helpful_count: 10,
        subcategory_id: "2",
        created_at: "2026-05-12T10:00:00.000Z",
    },
    {
        id: "2",
        title: "React hydration fix",
        content: "Ensure server and client output match",
        difficulty: "intermediate",
        helpful_count: 7,
        subcategory_id: "1",
        created_at: "2026-05-12T11:00:00.000Z",
    },
    {
        id: "3",
        title: "ESP32 WiFi reconnect",
        content: "Reconnect using retry logic",
        difficulty: "advanced",
        helpful_count: 15,
        subcategory_id: "3",
        created_at: "2026-05-12T12:00:00.000Z",
    },
];