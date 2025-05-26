import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import getHostProperties from "../services/hosts/getHostProperties.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get("/:id/properties", async (req, res, next) => {
  try {
    const { id } = req.params;
    const hostProperties = await getHostProperties(id);

    res.status(200).json(hostProperties);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const hosts = await getHosts();
    res.json(hosts);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
      listings,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
      listings
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);

    if (!host) {
      res.status(404).json({ message: `Host with id ${id} not found` });
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await deleteHostById(id);

    if (host) {
      res.status(200).send({
        message: `Host with id ${id} successfully deleted`,
        host,
      });
    } else {
      res.status(404).json({
        message: `Host with id ${id} not found`,
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
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
        listings,
      } = req.body;
      const host = await updateHostById(id, {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
        listings,
      });

      if (host) {
        res.status(200).send({
          message: `Host with id ${id} successfully updated`,
        });
      } else {
        res.status(404).json({
          message: `Host with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
