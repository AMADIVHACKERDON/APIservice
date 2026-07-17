import { desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { challenges } from "../../db/schema";

function parseTags(tags:any){
  if(!tags) return [];
  if(Array.isArray(tags)) return tags;
  if(typeof tags !== 'string') return [];
  const s = tags.trim();
  if(s.startsWith('[') || s.startsWith('{')){
    try{ return JSON.parse(s); }catch{ /* fallthrough */ }
  }
  return s.split(',').map((t)=>t.trim()).filter(Boolean);
}


export async function getChallenges(){
    const data = await db.query.challenges.findMany({
      orderBy: [
        desc(challenges.createdAt),
      ],

      with: {
        subcategory: true,
        reactions: true,
        comments: true,
        collaborations: true,
      },
    });


    return {
      data: data.map((challenge) => ({
        ...challenge,
        tags: parseTags(challenge.tags),
      })),
    };
}


export async function getChallengeById(
  id:string
){
    const challenge =
      await db.query.challenges.findFirst({
        where:eq(
          challenges.id,
          id
        ),

        with:{
          subcategory:true,
          reactions:true,
          comments:true,
          collaborations:true,
        },
      });

    return {
        ...challenge,
        tags: parseTags(challenge.tags),
    };
}

export async function getLatestChallenges() {
  const data = await db.query.challenges.findMany({
    orderBy: [
      desc(challenges.createdAt),
    ],
    limit: 6,
  });

  return data.map((challenge) => ({
    ...challenge,
    tags: parseTags(challenge.tags),
  }));
}

export async function getFeaturedChallenges() {
  const data = await db.query.challenges.findMany({
    where: eq(
      challenges.featured,
      true,
    ),
    orderBy: [
      desc(challenges.createdAt),
    ],
    limit: 3,
  });

  return data.map((challenge) => ({
    ...challenge,
    tags: parseTags(challenge.tags),
  }));
}

export async function getChallengeBySlug(
  slug:string
){
    const challenge =
      await db.query.challenges.findFirst({
        where:eq(
          challenges.slug,
          slug
        ),

        with:{
          subcategory:true,
          reactions:true,
          comments:true,
          collaborations:true,
        },
      });

    return {
        ...challenge,
        tags: parseTags(challenge.tags),
      }
}

export async function getPublishedChallenges()
{
    const data =
      await db.query.challenges.findMany({

        where: eq(
          challenges.published,
          true
        ),

        orderBy: [
          desc(challenges.createdAt),
        ],

        with: {
          subcategory: true,
          reactions: true,
          comments: true,
          collaborations: true,
        },

      });


  return data.map((item) => ({
    ...item,

    tags: parseTags(item.tags),
  }));
}

// export async function getFeaturedChallenges() {
//   const outChallenges = await db.query.challenges.findMany({
//     where: and(
//       eq(challenges.published, true),
//       eq(challenges.featured, true),
//     ),
//     orderBy: [desc(challenges.createdAt)],
//     limit: 3,
//   });

//   return outChallenges.map((challenge) => ({
//     ...challenge,
//     tags: challenge.tags
//       ? JSON.parse(challenge.tags)
//       : [],
//   }));
// }
