import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.deleteMany({
    where: { id },
});

if (!deleteUserById || deleteUserById.count === 0) {
    throw new NotFoundError('User', id)
  }
  return id 
};

export default deleteUserById;
