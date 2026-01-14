import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createSessions, getActiveSessions, getMyRecentSessions, getSessionsById, joinSession, endSession } from "../controllers/sessionController.js";

const router=express.Router();

router.post("/",protectRoute,createSessions)
router.get("/active",protectRoute,getActiveSessions)
router.get("/my-recent",protectRoute,getMyRecentSessions)
router.get("/:id",protectRoute,getSessionsById)
router.post("/:id/join",protectRoute,joinSession)
router.get("/:id/end",protectRoute,endSession)


export default router;