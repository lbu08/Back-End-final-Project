import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/NotFoundError.js";

const getAmenitiesByProperties = async (amenityId) => {
  const prisma = new PrismaClient();
  const amenitiesByProperties = await prisma.amenity.findUnique({
    where: {
      id: amenityId,
    },
    include: {
      properties: true,
    },
  });
  if (!amenitiesByProperties) {
    return null;
  }
  return amenitiesByProperties;
};

export default getAmenitiesByProperties;
