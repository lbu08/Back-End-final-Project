import { PrismaClient } from "@prisma/client";
//import NotFoundError from '../../errors/notFoundError.js';

const getHostProperties = async (id) => {
  const prisma = new PrismaClient();
  const hostProperties = await prisma.host.findUnique({
    where: {
      id: id,
    },
    include: {
      properties: true,
    },
  });
  if (!hostProperties) {
    return null;
  }
  return hostProperties;
};

export default getHostProperties;
