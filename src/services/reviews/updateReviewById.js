import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();
  const reviewExist = await prisma.review.findUnique({
    where: { id },
  });
  if (!reviewExist || reviewExist.count === 0) {
    return null;
  }
  const review = await prisma.review.updateMany({
    where: { id },
    data: updatedReview,
  });

  if (!review || review.count === 0) {
    return null;
  }

  return {
    message: `Review with id ${id} was updated!`,
  };
};

export default updateReviewById;
