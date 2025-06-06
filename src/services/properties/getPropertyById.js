import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const getPropertyById = async (id) => {
  console.log("getPropertyById function");
  console.log("id in getPropertyById:", id);

  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({
    where: { id },
  });

  console.log("property value in getPropertyById", property);

  if (!property) return null;

  return property;
};

export default getPropertyById;
