import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const userExist = await prisma.user.findUnique({
    where: { id },
  });
  if (!userExist || userExist.count === 0) {
    return null;
  }
  const user = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  if (!user || user.count === 0) {
    return null;
  }

  return {
    message: `User with id ${id} was updated!`,
  };
};

export default updateUserById;
