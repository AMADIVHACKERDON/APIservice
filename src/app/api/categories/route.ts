import { db } from "@/db"
import { categories, systemCategories, systems } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

interface Category{
    name: string
    system: string
};

async function createCategory(data: Category) {
    return await db.transaction(async (tx) => {
        const [systemExists] = await tx.select({ id: systems.id })
        .from(systems)
        .where(eq(systems.name, data.system))
        .limit(1);
    
        if (!systemExists) throw new Error("System not found");

        const [category] = await tx.insert(categories).values({
            name: data.name,
        }).returning();

        await tx.insert(systemCategories).values({
            categoryId: category.id,
            systemId: systemExists.id
        });

        return category.name;
    })
}


export async function POST(req: Request) {
    // zod validation later
    const body: Category = await req.json();

    try {
        const category = await createCategory(body);
        return NextResponse.json({ message: `${category} created successfully` });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}