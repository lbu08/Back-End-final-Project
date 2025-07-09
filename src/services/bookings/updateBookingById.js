import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const updateBookingById = async (id, userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus) => {
  const prisma = new PrismaClient();
  const bookingExist = await prisma.booking.findUnique({
    where: { id },
  });
  if (!bookingExist || bookingExist.count === 0) {
    return null;
  }
  const booking = await prisma.booking.updateMany({
    where: { id },
    data: {userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus},
  });

  if (!booking || booking.count === 0) {
    return null;
  }

  return {
    message: `Booking with id ${id} was updated!`,
  };
};

export default updateBookingById;
