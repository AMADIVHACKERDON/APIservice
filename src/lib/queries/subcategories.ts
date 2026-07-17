import { eq, asc } from "drizzle-orm";

import { db } from "@/db";
import { subcategories } from "@/db/schema";


export async function getSubcategoryById(
  id: string,
) {
  return db.query.subcategories.findFirst({
    where: eq(subcategories.id, id),
  });
}

export async function getSubcategories(
){

    const data =
      await db.query.subcategories.findMany({
        orderBy: [
          asc(subcategories.name),
        ],
      });


  return data;
}


export async function getSubcategoriesByCategory(
  category:
    | "software"
    | "hardware"
    | "hybrid"
)
{

    const data =
      await db.query.subcategories.findMany({
        where: eq(
          subcategories.category,
          category
        ),

        orderBy:[
          asc(subcategories.name),
        ],
      });


  return data;
}
