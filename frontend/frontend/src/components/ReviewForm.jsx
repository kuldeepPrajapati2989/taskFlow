import { useState } from "react";

const ReviewForm = ({ onReviewAdded }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const submitReview = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/reviews",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        rating,
                        comment,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setRating(5);
            setComment("");

            if (onReviewAdded) {
                onReviewAdded();
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
                Leave a Review
            </h2>

            <form
                onSubmit={submitReview}
                className="space-y-4"
            >
                <div>
                    <label className="block mb-2 font-medium">
                        Rating
                    </label>

                    <select
                        value={rating}
                        onChange={(e) =>
                            setRating(Number(e.target.value))
                        }
                        className="w-full border rounded-lg p-3"
                    >
                        <option value={5}>
                            ⭐⭐⭐⭐⭐ (5)
                        </option>
                        <option value={4}>
                            ⭐⭐⭐⭐ (4)
                        </option>
                        <option value={3}>
                            ⭐⭐⭐ (3)
                        </option>
                        <option value={2}>
                            ⭐⭐ (2)
                        </option>
                        <option value={1}>
                            ⭐ (1)
                        </option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Comment
                    </label>

                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        placeholder="Write your review..."
                        className="w-full border rounded-lg p-3 h-28"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    {loading
                        ? "Submitting..."
                        : "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;