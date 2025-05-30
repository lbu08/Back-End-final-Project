import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();
  const bookingExist = await prisma.booking.findUnique({
    where: { id },
  });
  if (!bookingExist || bookingExist.count === 0) {
    return null;
  }
  const booking = await prisma.booking.updateMany({
    where: { id },
    data: updatedBooking,
  });

  if (!booking || booking.count === 0) {
    return null;
  }

  return {
    message: `Booking with id ${id} was updated!`,
  };
};

export default updateBookingById;
