import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import getReviewsByUser from "../services/reviews/getReviewByUser.js";
import getReviewsByProperty from "../services/reviews/getReviewByProperty.js";
import deleteReviewById from "../services/reviews/deleteReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id/users",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reviewsByUser = await getReviewsByUser(id);

      res.status(200).json(reviewsByUser);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get(
  "/:id/properties",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reviewsByProperty = await getReviewsByProperty(id);

      res.status(200).json(reviewsByProperty);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReviewById(id);

    if (review) {
      res.status(200).send({
        message: `Review successfully deleted`,
        review,
      });
    } else {
      res.status(404).json({
        message: `Review not found`,
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
      const { userId, propertyId, rating, comment } = req.body;
      const review = await updateReviewById(id, {
        userId,
        propertyId,
        rating,
        comment,
      });

      if (review) {
        res.status(200).send({
          message: `Review successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Review not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
