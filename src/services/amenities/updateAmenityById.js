import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const updateAmenityById = async (id, updatedAmenity) => {
  const prisma = new PrismaClient();
  const amenityExist = await prisma.amenity.findUnique({
    where: { id },
  });
  if (!amenityExist || amenityExist.count === 0) {
    return null;
  }
  const amenity = await prisma.amenity.updateMany({
    where: { id },
    data: updatedAmenity,
  });

  if (!amenity || amenity.count === 0) {
    return null;
  }

  return {
    message: `Amenity with id ${id} was updated!`,
  };
};

export default updateAmenityById;
