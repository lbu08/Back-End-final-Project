import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.deleteMany({
    where: { id },
  });

  if (!deletePropertyById || deletePropertyById.count === 0) {
      throw new NotFoundError('Property', id)
    }
    return id 
  };

export default deletePropertyById;