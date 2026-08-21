import { NextRequest, NextResponse } from "next/server";


export type Person = {
    id: number;
    name: string;
    role: string;
    about: string;
    cvDetails: string;
    professionals: string;
    email: string;
    phone: string;
  };
  
  export type Category = {
    id: number;
    name: string;
    category: string;
    relatedIds:number[];
    expertId: number; // Will default to 999 if no specific expert is assigned
  };
  
  export const PERSONS_DATABASE: Person[] = [
    {
      id: 101,
      name: 'Sarah Connor',
      role: 'Principal Frontend Engineer',
      about: 'Specializes in production-grade React frameworks and server-side rendering optimizations.',
      cvDetails: '10+ years in web development. Former tech lead at Vercel ecosystem tools. Wrote 3 open-source routing plugins.',
      professionals: 'AWS Certified Solutions Architect, Next.js Core Contributor',
      email: 'sarah.c@techcorp.com',
      phone: '+1 (555) 234-5678',
    },
    {
      id: 102,
      name: 'Alex Rivera',
      role: 'Senior UI Architect',
      about: 'Passionate about state management, component lifecycles, and building scalable design systems.',
      cvDetails: 'Ex-Meta Engineer. Led migration of legacy architectures to React Fiber and Concurrent features.',
      professionals: 'Meta Certified Front-End Developer, Speaker at React Conf',
      email: 'alex.r@techcorp.com',
      phone: '+1 (555) 876-5432',
    },
    // SYSTEM DEFAULT FALLBACK ADMIN
    {
      id: 999,
      name: 'System Admin Support',
      role: 'General Tech Support & Triage Desk',
      about: 'Central support hub for unassigned or newly cataloged technology fields.',
      cvDetails: 'Automated routing desk managed by the senior engineering operations team.',
      professionals: 'ITIL Certified, TechCorp Global Helpdesk Infrastructure',
      email: 'support@techcorp.com',
      phone: '+1 (555) 000-1234',
    }
  ];
  
  export const CATEGORIES_DATABASE: Category[] = [
    { 
      id: 1, 
      name: 'Next.js', 
      category: 'Framework', 
      relatedIds:[2,4], 
      expertId: 101 // Sarah Connor
    },
    { 
      id: 2, 
      name: 'React', 
      category: 'Library', 
      relatedIds:[1,4], 
      expertId: 101 // Sarah Connor
    },
    { 
      id: 3, 
      name: 'TypeScript', 
      category: 'Language', 
      relatedIds:[4], 
      expertId: 102 // Alex Rivera
    },
    { 
      id: 4, 
      name: 'Tailwind CSS', 
      category: 'Styling', 
      relatedIds:[3,5], 
      expertId: 999 // No specific expert yet -> Falls back to Admin Support!
    }
  ];
  

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get('search');

  // If no search query parameter provided, return the full list of categories
  if (!search) {
    return NextResponse.json({
      success: true,
      mode: 'all_categories',
      data: CATEGORIES_DATABASE
    });
  }

  // 1. Perform relational matching on categories
  const matchedCategory = CATEGORIES_DATABASE.find((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // If search query exists but nothing matches the database catalog
  if (!matchedCategory) {
    return NextResponse.json({
      success: true,
      mode: 'search_results',
      matchedCategory: null,
      assignedExpert: null,
      relatedCategories: []
    });
  }

  // 2. Relational Database Resolution: Find the expert or assign fallback
  const assignedExpert = PERSONS_DATABASE.find(person => person.id === matchedCategory.expertId) 
    || PERSONS_DATABASE.find(person => person.id === 999);

  // 3. Relational Database Resolution: Find related dependencies
  const relatedCategories = CATEGORIES_DATABASE.filter(item => 
    matchedCategory.relatedIds.includes(item.id)
  );

  return NextResponse.json({
    success: true,
    mode: 'search_results',
    matchedCategory,
    assignedExpert,
    relatedCategories
  });
}
