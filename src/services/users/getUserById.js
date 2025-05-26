import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
        throw new NotFoundError('user', id)
      }
  
    return user;
  };

export default getUserById;