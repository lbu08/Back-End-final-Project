import { PrismaClient } from "@prisma/client";
import NotFoundError from  "../../errors/notFoundError.js";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.deleteMany({
    where: { id },
});

if (!deleteAmenityById || deleteAmenityById.count === 0) {
    throw new NotFoundError('Book', id)
  }
  return id 
};

export default deleteAmenityById;

