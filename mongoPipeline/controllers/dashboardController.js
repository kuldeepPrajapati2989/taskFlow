import Task from "../models/Task.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Review from "../models/Review.js";

export const getDashboard = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;

        const priorityStats = await Task.aggregate([
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 },
                },
            },
        ]);

        const totalTasks = await Task.countDocuments();

        const pendingTasks = await Task.countDocuments({
            status: "pending",
        });

        const completedTasks = await Task.countDocuments({
            status: "completed",
        });

        const monthlyReport = await Task.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                    },
                    totalTasks: { $sum: 1 },
                },
            },
            {
                $sort: {
                    "_id.month": 1,
                },
            },
        ]);

        const totalUsers = await User.countDocuments();

        const totalReviews = await Review.countDocuments();

        const averageRatingData = await Review.aggregate([
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                    },
                },
            },
        ]);

        const averageRating =
            averageRatingData[0]?.averageRating || 0;

        const limit = 3;

        const latestReviews = await Review.find()
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const today = new Date();

        const upcomingTasks = await Task.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(
                        req.user.id
                    ),
                    status: "pending",
                    dueDate: {
                        $gte: today,
                    },
                },
            },
            {
                $sort: {
                    dueDate: 1,
                },
            },
            {
                $limit: 5,
            },
        ]);

        const responseData = {
            totalTasks,
            pendingTasks,
            completedTasks,
            totalUsers,
            totalReviews,
            averageRating,
            latestReviews,
            currentPage: page,
            totalPages: Math.ceil(
                totalReviews / limit
            ),
            priorityStats,
            monthlyReport,
            upcomingTasks,
        };

        res.status(200).json(responseData);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};