import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  const propertyExist = await prisma.property.findUnique({
    where: { id },
  });
  if (!propertyExist || propertyExist.count === 0) {
    return null;
  }
  const property = await prisma.property.deleteMany({
    where: { id },
  });

  if (!property || property.count === 0) {
    return null;
  }
  return id;
};

export default deletePropertyById;
