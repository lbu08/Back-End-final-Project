import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const getReviewById = async (id) => {
  console.log("getReviewById function");
  console.log("id in getReviewById:", id);

  const prisma = new PrismaClient();
  const review = await prisma.review.findUnique({
    where: { id },
  });

  console.log("review value in getReviewById", review);

  if (!review) {
    return null;
  }

  return review;
};

export default getReviewById;
