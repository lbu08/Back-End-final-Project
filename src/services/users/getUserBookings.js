import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const getUserBookings = async (userId) => {
  const prisma = new PrismaClient();
  const userBookings = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      booking: true,
    },
  });

  if (!userBookings) {
    throw new NotFoundError("User", userId);
  }
  return userBookings;
};

export default getUserBookings;
