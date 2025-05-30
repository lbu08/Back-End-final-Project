import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const getAmenityById = async (id) => {
  console.log("getAmenityById function");
  console.log("id in getAmenityById:", id);

  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.findUnique({
    where: { id },
  });

  console.log("amenity value in getAmenityById", amenity);

  if (!amenity) {
    return null;
  }

  return amenity;
};

export default getAmenityById;
