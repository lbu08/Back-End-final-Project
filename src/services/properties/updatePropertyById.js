import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const updatePropertyById = async (
  id,
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating
) => {
  const prisma = new PrismaClient();
  const propertyExist = await prisma.property.findUnique({
    where: { id }
  });
  if (!propertyExist || propertyExist.count === 0) {
    return null;
  }
  const property = await prisma.property.update({
    where: { id },
    data: {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating
    },
  });

  if (!property || property.count === 0) {
    return null;
  }

  return {
    message: `Property with id ${id} was updated!`,
  };
};

export default updatePropertyById;
