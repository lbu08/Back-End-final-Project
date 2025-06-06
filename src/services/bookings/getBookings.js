import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  
  const prisma = new PrismaClient();
   const filters = {};
  
    if (userId) {
      filters.userId = {
        contains: userId,
      };
    }
  const bookings = await prisma.booking.findMany({
    where: filters,
  });
  console.log("bookings:", bookings)
  return bookings;
};

export default getBookings;
