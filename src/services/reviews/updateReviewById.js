import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.updateMany({
    where: { id },
    data: updatedReview,
  });

  if (!updatedReview || updatedReview.count === 0) {
      throw new NotFoundError('Review', id)
    }
  
    return {
      message: `Review with id ${id} was updated!`
    }
  }

export default updateReviewById;