import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  const hostExist = await prisma.host.findUnique({
    where: { id },
  });
  if (!hostExist || hostExist.count === 0) {
    return null;
  }
  const host = await prisma.host.deleteMany({
    where: { id },
  });

  if (!host || host.count === 0) {
    return null;
  }
  return id;
};

export default deleteHostById;
