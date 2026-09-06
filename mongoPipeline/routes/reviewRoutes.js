import express from "express";
import auth from "../middleware/auth.js";
import {
    createReview,
    getReviews,
    deleteReview,
    reviewStats,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", auth, createReview);

router.get("/", getReviews);

router.get("/stats", reviewStats);

router.delete("/:id", auth, deleteReview);

export default router;