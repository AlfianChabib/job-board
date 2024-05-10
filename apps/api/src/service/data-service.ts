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
}
