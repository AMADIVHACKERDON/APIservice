import { desc } from "drizzle-orm";

import { db } from "@/db";
import { contacts } from "@/db/schema";


export async function getContacts()
{

    const data =
      await db.query.contacts.findMany({

        orderBy:[
          desc(contacts.createdAt),
        ],

      });


  return data;

}
