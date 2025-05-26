import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();

  const property = await prisma.property.update({
    where: { id },
    data: updatedProperty,
  });

  if (!updatedProperty || updatedProperty.count === 0) {
      throw new NotFoundError('Property', id)
    }

  return {
    message: `Property with id ${id} was updated!`
  }
}
  

export default updatePropertyById;