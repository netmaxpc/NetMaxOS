
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create test user
  const hashedPassword = await bcrypt.hash('johndoe123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword,
      role: 'admin',
    },
  })

  // Create some sample projects for the test user
  const sampleProjects = [
    {
      name: 'NetMax Website Redesign',
      description: 'Complete redesign of the company website with modern UI/UX',
      type: 'website',
      status: 'active',
    },
    {
      name: 'AI Customer Service Bot',
      description: 'Development of an AI-powered customer service chatbot',
      type: 'ai_training',
      status: 'active',
    },
    {
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for business management',
      type: 'app',
      status: 'completed',
    },
  ]

  for (const project of sampleProjects) {
    await prisma.project.upsert({
      where: { 
        id: `${testUser.id}-${project.name.toLowerCase().replace(/\s+/g, '-')}` 
      },
      update: {},
      create: {
        ...project,
        userId: testUser.id,
        id: `${testUser.id}-${project.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
