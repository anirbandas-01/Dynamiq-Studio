import express from "express";

import { createApp, getApp } from "../controller/appController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createApp);
router.get("/:id", getApp);

export default router;