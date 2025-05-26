import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.deleteMany({
    where: { id },
});

  if (!deleteHostById || deleteHostById.count === 0) {
      throw new NotFoundError('Host', id)
    }
    return id 
  };

export default deleteHostById;
