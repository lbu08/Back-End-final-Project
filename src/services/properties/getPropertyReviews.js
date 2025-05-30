import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/NotFoundError.js";

const getPropertyReviews = async (propertyId) => {
  const prisma = new PrismaClient();
  const propertyReviews = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      reviews: true,
    },
  });
  if (!propertyReviews) {
    return null;
  }
  return propertyReviews;
};

export default getPropertyReviews;
