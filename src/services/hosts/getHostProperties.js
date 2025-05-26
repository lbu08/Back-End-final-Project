import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const getHostProperties = async (hostId) => {
  const prisma = new PrismaClient();
  const hostProperties = await prisma.host.findUnique({
    where: {
      id: hostId,
    },
    include: {
      properties: true,
    },
  });
  if (!hostProperties) {
    throw new NotFoundError('Host', hostId);
  }
  return hostProperties;
};

export default getHostProperties;
