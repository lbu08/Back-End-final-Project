import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const getUserById = async (id) => {
  console.log("getUserById function");
  console.log("id in getUserById:", id);

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id },
  });

  console.log("user value in getUserById", user);

  if (!user) {
    return null;
  }

  return user;
};

export default getUserById;
