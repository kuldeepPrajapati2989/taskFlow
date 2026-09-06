import express from "express";
import auth from "../middleware/auth.js";
import {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask,
    searchTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", auth, createTask);

router.get("/", auth, getMyTasks);

router.get("/search", auth, searchTasks);

router.put("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);


export default router;