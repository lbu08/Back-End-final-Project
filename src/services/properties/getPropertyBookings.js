import { PrismaClient } from "@prisma/client";
//import NotFoundError from '../../errors/notFoundError.js';

const getPropertyByBooking = async (propertyId) => {
  const prisma = new PrismaClient();
  const propertyByBooking = await prisma.property.findUnique({
    where: {
      id: id,
    },
    include: {
      bookings: true,
    },
  });
  if (!propertyByBooking) {
    return null;
  }
  return propertyByBooking;
};

export default getPropertyByBooking;
