import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deleteProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import getPropertyBookings from "../services/properties/getPropertyBookings.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/:id/bookings",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const propertyBookings = await getPropertyBookings(id);

      res.status(200).json(propertyBookings);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get("/", async (req, res, next) => {
  try {
    const properties = await getProperties();
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      rating,
    } = req.body;
    const newProperty = await createProperty(
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      res.status(404).json({ message: `Property with id ${id} not found` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deletePropertyById(id);

    if (property) {
      res.status(200).send({
        message: `Property with id ${id} successfully deleted`,
        user,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathroomCount,
        maxGuestCount,
        rating,
      } = req.body;
      const user = await updatePropertyById(id, {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathroomCount,
        maxGuestCount,
        rating,
      });

      if (property) {
        res.status(200).send({
          message: `Property with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Property with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
