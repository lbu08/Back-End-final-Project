import { PrismaClient } from "@prisma/client";
//import NotFoundError from "../../errors/notFoundError.js";

const getHostById = async (id) => {
  console.log("getHostById function");
  console.log("id in getHostById:", id);

  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({
    where: { id },
  });

  console.log("host value in getHostById", host);

  if (!host) {
    return null;
  }
  return host;
};

export default getHostById;
