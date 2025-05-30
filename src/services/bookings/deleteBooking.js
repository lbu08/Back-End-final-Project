import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const deleteBookingById = async (id) => {
  const prisma = new PrismaClient();
  const bookingExist = await prisma.booking.findUnique({
    where: { id },
  });
  if (!bookingExist || bookingExist.count === 0) {
    return null;
  }
  const booking = await prisma.booking.deleteMany({
    where: { id },
  });

  if (!booking || booking.count === 0) {
    return null;
  }
  return id;
};

export default deleteBookingById;
