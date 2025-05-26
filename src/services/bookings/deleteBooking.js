import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.deleteMany({
    where: { id },
  });

  if (!deleteBookingById || deleteBookingById.count === 0) {
      throw new NotFoundError('Booking', id)
    }
    return id 
  };


export default deleteBookingById;