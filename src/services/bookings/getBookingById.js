import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const getBookingById = async (id) => {
  console.log("getBookingById function");
  console.log("id in getBookingById:", id);

  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  console.log("booking value in getBookingById", booking);

  if (!booking) return null;
  return booking;
};

export default getBookingById;
