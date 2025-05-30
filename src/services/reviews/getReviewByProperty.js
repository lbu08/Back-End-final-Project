import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/NotFoundError.js";

const getReviewsByProperty = async (reviewId) => {
  const prisma = new PrismaClient();
  const reviewsByProperty = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      properties: true,
    },
  });
  if (!reviewsByProperty) {
    return null;
  }
  return reviewsByProperty;
};

export default getReviewsByProperty;
