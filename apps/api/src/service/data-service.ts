import { prisma } from '../prisma';

export class DataService {
  public static async getClassification() {
    const data = await prisma.classification.findMany();
    return data;
  }

  public static async getSubClassification() {
    const data = await prisma.subClassificaion.findMany();
    return data;
  }

  public static async getSkill(payload: { text: string }) {
    const data = await prisma.skill.findMany({
      where: {
        ...(payload.text && { Text: { startsWith: payload.text } }),
      },
      take: 8,
      orderBy: { Text: 'asc' },
    });
    return data;
  }
}
