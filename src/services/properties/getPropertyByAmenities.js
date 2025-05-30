import { PrismaClient } from "@prisma/client";

const getPropertyByAmenities = async (bookingId) => {
  const prisma = new PrismaClient();
  const propertyByAmenities = await prisma.property.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      amenities: true,
    },
  });
  if (!propertyByAmenities) {
    return null;
  }
  return propertyByAmenities;
};

export default getPropertyByAmenities;
