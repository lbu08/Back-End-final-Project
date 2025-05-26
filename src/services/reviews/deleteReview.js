import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteReviewById = async (id) => {
  const prisma = new PrismaClient();
  const reviewExist = await prisma.review.findUnique({
    where: { id },
  });
  if (!reviewExist || reviewExist.count === 0) {
    return null;
  }
  const review = await prisma.review.deleteMany({
    where: { id },
  });

  if (!review || review.count === 0) {
    throw new NotFoundError("Review", id);
  }
  return id;
};

export default deleteReviewById;
