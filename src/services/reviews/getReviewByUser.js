import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getReviewsByUser = async (reviewId) => {
  const prisma = new PrismaClient();
  const reviewsByUser = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      users: true,
    },
  });
  if (!reviewsByUser) {
    throw new NotFoundError("Review", reviewId);
  }
  return reviewsByUser;
};

export default getReviewsByUser;
