import { db } from "@/db";
import { categories, categoryFields, fields, systemCategories, systems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

async function get_systems_categories(id) {
    return await db.select()
        .from(systems)
        .leftJoin(systemCategories, eq(systemCategories.systemId, systems.id))
        .leftJoin(categories, eq(categories.id, systemCategories.categoryId))
        .leftJoin(categoryFields, eq(categoryFields.categoryId, categories.id))
        .leftJoin(fields, eq(fields.id, categoryFields.fieldId))
        .where(eq(systems.id, id));
}

type CategoryWithFields = {
    id: number
    name: string
    fields: string[]
}

type SystemWithCategories = {
    id: number
    name: string
    type: string
    categories: CategoryWithFields[]
}
  
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    
    const id = parseInt((await params).id);
    
    const systemCategory = await get_systems_categories(id);

    const data = systemCategory.reduce((acc, row) => {
        const existingSystem = acc.find(s => s.id === row.systems.id);

        if (existingSystem) {
            const existingCategory = existingSystem.categories.find(cat => cat.id === row.categories.id);
            
            if (existingCategory) {
                if (row.fields?.name) {  // only push if field exists
                    existingCategory.fields.push(row.fields.name)
                }
            }
            else {
                existingSystem.categories.push({
                    id: row.categories.id,
                    name: row.categories.name,
                    fields: row.fields?.name ? [row.fields.name] : []  // empty array if no fields
                });
            }
        
        }
        else {
            acc.push({
                id: row.systems.id,
                name: row.systems.name,
                type: row.systems.type,
                categories: [{
                    id: row.categories.id,
                    name: row.categories.name,
                    fields: row.fields?.name ? [row.fields.name] : []  // empty array if no fields
                }]
            })
        }

        return acc;

    }, [] as SystemWithCategories[])

    return NextResponse.json({data});
}
