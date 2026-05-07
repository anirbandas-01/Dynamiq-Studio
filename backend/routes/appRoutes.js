import express from "express";

import { createApp, deleteApp, getApp, getUserApps } from "../controller/appController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createApp);
router.get("/", verifyToken, getUserApps);
router.get("/:id",verifyToken, getApp);
router.delete("/:id", verifyToken, deleteApp);

export default router;