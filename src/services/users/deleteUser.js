import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  const userExist = await prisma.user.findUnique({
    where: { id },
  });
  if (!userExist || userExist.count === 0) {
    return null;
  }
  const user = await prisma.user.deleteMany({
    where: { id },
  });

  if (!user || user.count === 0) {
    return null;
  }
  return id;
};

export default deleteUserById;
