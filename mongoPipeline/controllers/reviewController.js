import Review from "../models/Review.js";

export const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.create({
            userId: req.user.id,
            rating,
            comment,
        });

        res.status(201).json(review);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getReviews = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;

        const totalReviews = await Review.countDocuments();

        const reviews = await Review.find()
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const responseData = {
            reviews,
            currentPage: page,
            totalPages: Math.ceil(totalReviews / limit),
            totalReviews,
        };

        res.status(200).json(responseData);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Review Deleted",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const reviewStats = async (req, res) => {
    try {
        const totalReviews =
            await Review.countDocuments();

        const avgRating = await Review.aggregate([
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                    },
                },
            },
        ]);

        const responseData = {
            totalReviews,
            averageRating:
                avgRating[0]?.averageRating || 0,
        };

        res.status(200).json(responseData);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};