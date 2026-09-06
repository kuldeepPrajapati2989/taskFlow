import express from "express";
import auth from "../middleware/auth.js";
import { completedVsPending, monthlyReport, taskByPriority, taskByStatus, upcomingTasks } from "../controllers/analyticsController.js";
import { searchTasks, topUsers, userWithTasks } from "../controllers/taskController.js";

const router = express.Router();

router.get("/status", auth, taskByStatus);

router.get("/priority", auth, taskByPriority);

router.get("/completed-pending", auth, completedVsPending);

router.get("/monthly-report", auth, monthlyReport);

router.get("/upcoming-tasks", auth, upcomingTasks);

router.get("/user-tasks", auth, userWithTasks);

router.get("/top-users", auth, topUsers);

router.get("/search", auth, searchTasks);

export default router;