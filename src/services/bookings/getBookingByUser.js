import { PrismaClient } from "@prisma/client";
//import NotFoundError from '../../errors/NotFoundError.js';

// const getBookingsByUser = async (bookingId) => {
//   const prisma = new PrismaClient();
//   const bookingsByUser = await prisma.booking.findUnique({
//     where: {
//       id: bookingId,
//     },
//     include: {
//       user: true,
//     },
//   });
//   if (!bookingsByUser) {
//     return null;
//   }
//   return bookingsByUser;
// };

// export default getBookingsByUser;
