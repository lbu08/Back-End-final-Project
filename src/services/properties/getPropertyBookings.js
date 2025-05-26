import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';


const getPropertyBookings = async (propertyId) => {
  const prisma = new PrismaClient();
  const propertyBookings = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      bookings: true,
    },
  });
  if (!propertyBookings) {
    throw new NotFoundError('Property', propertyId);
  }
  return propertyBookings;
};

export default getPropertyBookings;
