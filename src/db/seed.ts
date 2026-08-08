import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function seed() {

  const { db } = await import('.')
  const { systems, categories, fields, systemCategories, categoryFields } = await import('./schema')

  // systems
  const insertedSystems = await db.insert(systems).values([
    { name: 'Network Infrastructure', type: 'hardware' },
    { name: 'CRM Software', type: 'software' },
    { name: 'Cloud Platform', type: 'hybrid' },
  ]).returning()

  // categories
  const insertedCategories = await db.insert(categories).values([
    { name: 'Switches' },
    { name: 'Security' },
    { name: 'Contacts' },
    { name: 'Reports' },
  ]).returning()

  // fields
  const insertedFields = await db.insert(fields).values([
    { name: 'IP Address' },
    { name: 'MAC Address' },
    { name: 'Email' },
    { name: 'Status' },
  ]).returning()

  // system_categories (many to many)
  await db.insert(systemCategories).values([
    { systemId: insertedSystems[0].id, categoryId: insertedCategories[0].id }, // Network → Switches
    { systemId: insertedSystems[0].id, categoryId: insertedCategories[1].id }, // Network → Security
    { systemId: insertedSystems[1].id, categoryId: insertedCategories[2].id }, // CRM → Contacts
    { systemId: insertedSystems[2].id, categoryId: insertedCategories[1].id }, // Cloud → Security too
  ])

  // category_fields (many to many)
  await db.insert(categoryFields).values([
    { categoryId: insertedCategories[0].id, fieldId: insertedFields[0].id }, // Switches → IP Address
    { categoryId: insertedCategories[0].id, fieldId: insertedFields[1].id }, // Switches → MAC Address
    { categoryId: insertedCategories[2].id, fieldId: insertedFields[2].id }, // Contacts → Email
    { categoryId: insertedCategories[2].id, fieldId: insertedFields[3].id }, // Contacts → Status
  ])

  console.log('Seeded successfully')
  process.exit(0)
}

seed()