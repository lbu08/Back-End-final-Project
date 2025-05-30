import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const amenityExist = await prisma.amenity.findUnique({
    where: { id },
  });
  if (!amenityExist || amenityExist.count === 0) {
    return null;
  }
  const amenity = await prisma.amenity.deleteMany({
    where: { id },
  });

  if (!amenity || amenity.count === 0) {
    return null;
  }
  return id;
};

export default deleteAmenityById;
