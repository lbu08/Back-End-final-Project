import { PrismaClient } from "@prisma/client";

const createHost = async (
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
  const host = await prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
      listings
      
    },
  });

  return host;
};

export default createHost;