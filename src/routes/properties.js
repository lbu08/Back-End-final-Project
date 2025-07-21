import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deleteProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import getPropertyBookings from "../services/properties/getPropertyBookings.js";
import getPropertyByAmenities from "../services/properties/getPropertyByAmenities.js";
import getPropertyHost from "../services/properties/getPropertyHost.js";
import authMiddleware from "../middleware/auth.js";
import NotFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const properties = await getProperties();
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

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
  NotFoundErrorHandler
);

router.get(
  "/:id/amenities",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const propertyByAmenities = await getPropertyByAmenities(id);

      res.status(200).json(propertyByAmenities);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.get(
  "/:id/hosts",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const propertyHost = await getPropertyHost(id);

      res.status(200).json(propertyHost);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.get("/", async (req, res, next) => {
  try {
    console.log("Full query object:", req.query);
    const { location, pricePerNight } = req.query;
    console.log("location:", location);
    console.log("pricePerNight:", pricePerNight);
    const properties = await getProperties(location, pricePerNight);
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
      bathRoomCount,
      maxGuestCount,
      rating,
    } = req.body;
     console.log("POST hetPropertyById hostId:", hostId);
    if (
      !hostId ||
      !title ||
      !description ||
      !location ||
      !pricePerNight ||
      !bedroomCount ||
      !bathRoomCount ||
      !maxGuestCount ||
      !rating
    ) {
      res.status(400).json({ message: `Bad request` });
    } else {
    const newProperty = await createProperty(
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating
    );

    if (!newProperty) {
      res.status(404).json({
        message: `Something went wrong, new property was not created!`,
      });
    } else {
      res.status(201).json(newProperty);
    }}
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);
    console.log(id);
    console.log("getPropertyById function");
    console.log("id in getPropertyById:", id);

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
        message: `Property with id ${id} successfully deleted`
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
      console.log("HELLO PROPERTY ! ! !")
      const { id } = req.params;
      const {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
      } = req.body;
      if (
        // !hostId ||
        !title ||
        !description ||
        !location ||
        !pricePerNight ||
        !bedroomCount ||
        !bathRoomCount ||
        !maxGuestCount ||
        !rating
      ) 
      {
        res.status(400).json({ message: `Not found` });
      } else {
      const property = await updatePropertyById(
        id,
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating
      );                                                                                                               

      if (property) {
        res.status(200).send({
          message: `Property with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Property with id ${id} not found`,
        });
      }
    }
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

export default router;
