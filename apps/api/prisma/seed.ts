import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import classificationData from './seed/classification.json';

const main = async () => {
  try {
    Promise.all(
      classificationData.preferredClassificationOptions.map((data) => {
        return prisma.classification.create({
          data: {
            title: data.description,
            subClassification: { create: data.subClassifications.map((sub) => ({ title: sub.description })) },
          },
        });
      }),
    );
  } catch (error) {
    console.log('Seeding Classification Data Error: ', error);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
