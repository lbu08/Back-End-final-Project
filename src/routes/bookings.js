import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import getBookingProperties from "../services/bookings/getBookingProperties.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/:id/properties",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const bookingProperties = await getBookingProperties(id);

      res.status(200).json(bookingProperties);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get("/", async (req, res, next) => {
  try {
    const bookings = await getBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    console.log("getBookingById function");
    console.log("id in getBookingById:", id);

    if (!booking) {
      res.status(404).json({ message: `Booking with id ${id} not found` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await deleteBookingById(id);

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully deleted`,
        booking,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
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
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;
      const booking = await updateBookingById(id, {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      });

      if (booking) {
        res.status(200).send({
          message: `Booking with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Booking with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
