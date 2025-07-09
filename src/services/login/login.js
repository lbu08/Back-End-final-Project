import { PrismaClient } from "@prisma/client";

const login = async (username, password) => {
  const prisma = new PrismaClient();
   
  const newUsername = await prisma.user.findUnique({
    where: { username, password },
  });

   return newUsername;
};

export default login;
