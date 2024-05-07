import { Prisma, PrismaClient } from '@prisma/client';
import { logger } from './utils/logging';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
  ],
});

prisma.$on('query', (e: Prisma.QueryEvent) => {
  logger.info('Query: ' + e.query);
  logger.info('Duration: ' + e.duration + 'ms');
});

prisma.$on('info', (e: Prisma.LogEvent) => {
  logger.info(e);
});

prisma.$on('warn', (e: Prisma.LogEvent) => {
  logger.warn(e);
});

prisma.$on('error', (e: Prisma.LogEvent) => {
  logger.error(e);
});
