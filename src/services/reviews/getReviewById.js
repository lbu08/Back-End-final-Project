import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const getReviewById = async (id) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    return null;
  }

  return review;
};

export default getReviewById;
