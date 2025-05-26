import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';


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
    throw new NotFoundError('User', userId);
  }
  return userReviews;
};

export default getUserReviews;

 