import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUser.js";
import updateUserById from "../services/users/updateUserById.js";
import getUserBookings from "../services/users/getUserBookings.js";
import getUserReviews from "../services/users/getUserReviews.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/:id/bookings",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userBookings = await getUserBookings(id);

      res.status(200).json(userBookings);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get(
  "/:id/reviews",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userReviews = await getUserReviews(id);

      res.status(200).json(userReviews);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully deleted`,
        user,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
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
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      const user = await updateUserById(id, {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
      });

      if (user) {
        res.status(200).send({
          message: `User with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `User with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
