import express from 'express';

const app = express();

app.use(express.json());

// --- Mock Data ---
const categories = [
    { id: '1', name: 'IoT', slug: 'iot', subcategories: ['smart-home', 'industrial'] },
    { id: '2', name: 'AI', slug: 'ai', subcategories: ['machine-learning', 'nlp'] },
];

const subcategories = [
    { id: '101', name: 'Smart Home System', slug: 'smart-home', category_slug: 'iot' },
    { id: '102', name: 'Industrial IoT', slug: 'industrial', category_slug: 'iot' },
    { id: '103', name: 'Machine Learning', slug: 'machine-learning', category_slug: 'ai' },
    { id: '104', name: 'NLP', slug: 'nlp', category_slug: 'ai' },
];

const solutions = [
    {
        id: '201', title: 'Fix Alexa Hub',
        content: 'Reset hub by holding button for 10s',
        difficulty: 'beginner', verified: true, helpful_count: 42,
        category_slug: 'smart-home', // Linked to subcategory slug
        parent_category_slug: 'iot', // Linked to parent category
        author: { username: 'john_doe' },
        created_at: '2026-04-24T12:00:00Z'
    },
    {
        id: '202', title: 'Train BERT Model',
        content: 'Use HuggingFace transformers library...',
        difficulty: 'advanced', verified: true, helpful_count: 89,
        category_slug: 'nlp',
        parent_category_slug: 'ai',
        author: { username: 'ai_expert' },
        created_at: '2026-04-24T14:00:00Z'
    }
];

// --- Helper for Pagination ---
const paginate = (data, page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    return data.slice(start, start + Number(limit));
};


// --- Routes ---

// Get all categories
app.get('/v1/categories', (req, res) => {
    res.json(categories);
});

// Get single category by slug
app.get('/v1/categories/:slug', (req, res) => {
    const category = categories.find(c => c.slug === req.params.slug);
    category ? res.json(category) : res.status(404).json({ error: 'Category not found' });
});

// Get all solutions under a PARENT category (e.g., /categories/iot/solutions)
app.get('/v1/categories/:slug/solutions', (req, res) => {
    const { slug } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const filtered = solutions.filter(s => s.parent_category_slug === slug);
    
    res.json({
        total: filtered.length,
        data: paginate(filtered, page, limit)
    });
});

// Get all subcategories
app.get('/v1/subcategories', (req, res) => {
    res.send(subcategories);
});


// Get single subcategory by slug
app.get('/v1/subcategories/:slug', (req, res) => {
    const sub = subcategories.find(s => s.slug === req.params.slug);
    sub ? res.json(sub) : res.status(404).json({ error: 'Subcategory not found' });
});

// Get solutions by subcategory (e.g., /subcategories/smart-home/solutions)
app.get('/v1/subcategories/:slug/solutions', (req, res) => {
    const { slug } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const filtered = solutions.filter(s => s.category_slug === slug);

    res.json({
        total: filtered.length,
        page: Number(page),
        data: paginate(filtered, page, limit)
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
