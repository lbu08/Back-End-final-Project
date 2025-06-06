import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();
  const filters = {};

  if (username) {
    filters.username = {
      contains: username,
    };
  }

  if (email) {
    filters.email = {
      contains: email,
    };
  }

  const users = await prisma.user.findMany({
    where: filters,
  });

  return users;
};

export default getUsers;
