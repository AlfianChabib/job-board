import { PrismaClient } from '@prisma/client';
import classificationData from './seed/classification.json';
import skills from './seed/skills.json';

const prisma = new PrismaClient({
  datasources: { db: { url: `${process.env.DATABASE_URL}?connection_limit=60&pool_timeout=0` } },
});

let skillsData: Array<{ Text: string; Label: number }> = skills as unknown as Array<{ Text: string; Label: number }>;

async function main() {
  try {
    const classificationSeed = classificationData.preferredClassificationOptions.map(async (data) => {
      return await prisma.classification.create({
        data: {
          title: data.description,
          subClassification: { create: data.subClassifications.map((sub) => ({ title: sub.description })) },
        },
      });
    });
    const skillSeed = skillsData.map(async (data) => {
      return await prisma.skill.create({ data: { Text: data.Text } });
    });

    Promise.all([classificationSeed, skillSeed]);
  } catch (error) {
    console.log('Seeding Classification Data Error: ', error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
