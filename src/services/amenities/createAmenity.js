import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();
  const newAmenity = {
    name,
  };

  const amenity = await prisma.amenity.create({
    data: newAmenity,
  });
  return amenity;

  if (!amenity) {
    res
      .status(404)
      .json({ message: `Something went wrong, new amenity was not created!` });
  } else {
    res.status(200).json(amenity);
  }
};

export default createAmenity;
