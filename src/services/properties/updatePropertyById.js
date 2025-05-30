import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();
  const propertyExist = await prisma.property.findUnique({
    where: { id },
  });
  if (!propertyExist || propertyExist.count === 0) {
    return null;
  }

  const property = await prisma.property.update({
    where: { id },
    data: updatedProperty,
  });

  if (!property || property.count === 0) {
    return null;
  }

  return {
    message: `Property with id ${id} was updated!`,
  };
};

export default updatePropertyById;
