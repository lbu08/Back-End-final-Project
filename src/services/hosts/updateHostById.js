import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe,
  listings
) => {
  const prisma = new PrismaClient();
  const hostExist = await prisma.host.findUnique({
    where: { id },
  });
  if (!hostExist || hostExist.count === 0) {
    return null;
  }
  const host = await prisma.host.updateMany({
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
      aboutMe,
      listings,
    },
  });

  if (!host || host.count === 0) {
    return null;
  }

  return {
    message: `Host with id ${id} was updated!`,
  };
};

export default updateHostById;
