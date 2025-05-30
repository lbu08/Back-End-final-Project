import { PrismaClient } from "@prisma/client";
//import NotFoundError from '../../errors/notFoundError.js';

const getUserReviews = async (userId) => {
  const prisma = new PrismaClient();
  const userReviews = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      reviews: true,
    },
  });
  if (!userReviews) {
    return null;
  }
  return userReviews;
};

export default getUserReviews;
