import { db } from "@/db"
import { fields, categoryFields, categories } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

interface Field {
  name: string
  category: string
}

async function createField(data: Field) {
  return await db.transaction(async (tx) => {
    const [categoryExists] = await tx.select({ id: categories.id })
      .from(categories)
      .where(eq(categories.name, data.category))
      .limit(1)

    if (!categoryExists) throw new Error("Category not found")

    const [field] = await tx.insert(fields).values({
      name: data.name
    }).returning()

    await tx.insert(categoryFields).values({
      fieldId: field.id,
      categoryId: categoryExists.id
    })

    return field.name
  })
}

export async function POST(req: Request) {
  const body: Field = await req.json()

  try {
    const field = await createField(body)
    return NextResponse.json({ message: `${field} created successfully` })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}