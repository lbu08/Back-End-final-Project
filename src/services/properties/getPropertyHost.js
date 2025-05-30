import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/NotFoundError.js";

const getPropertyHost = async (bookingId) => {
  const prisma = new PrismaClient();
  const propertyHost = await prisma.property.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      hosts: true,
    },
  });
  if (!propertyHost) {
    return null;
  }
  return propertyHost;
};

export default getPropertyHost;
