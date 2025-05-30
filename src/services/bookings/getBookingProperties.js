import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const getBookingProperties = async (bookingId) => {
  const prisma = new PrismaClient();
  const bookingProperties = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      properties: true,
    },
  });
  if (!bookingProperties) {
    return null;
  }
  return bookingProperties;
};

export default getBookingProperties;
