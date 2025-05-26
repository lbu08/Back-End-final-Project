import { PrismaClient } from "@prisma/client";

const createProperty = async (
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathroomCount,
  maxGuestCount,
  rating,
) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.create({
    data: {
      hostId: {
        connect: { id: hostId },
      },
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      rating,
      },
  });

  return property;
};

export default createProperty;