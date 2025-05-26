import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const getBookingProperties = async (booking_id) => {
  const prisma = new PrismaClient();
  const bookingProperties = await prisma.booking.findUnique({
    where: {
      id: booking_id,
    },
    include: {
      property: true,
    },
  });
  if (!bookingProperties) {
    throw new NotFoundError("Booking", booking_id);
  }
  return bookingProperties;
};

export default getBookingProperties;
