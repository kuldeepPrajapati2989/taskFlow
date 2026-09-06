const Reviews = ({
    totalReviews,
    averageRating,
    reviews,
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
                Reviews & Ratings
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-gray-500">
                        Total Reviews
                    </h3>

                    <p className="text-3xl font-bold text-blue-600">
                        {totalReviews}
                    </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-gray-500">
                        Average Rating
                    </h3>

                    <p className="text-3xl font-bold text-yellow-600">
                        {Number(averageRating || 0).toFixed(1)} ⭐
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {reviews?.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border rounded-lg p-3"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">
                                    {review.userId?.name}
                                </h3>

                                <span className="text-yellow-500">
                                    {"⭐".repeat(review.rating)}
                                </span>
                            </div>

                            <p className="text-gray-600 mt-2">
                                {review.comment}
                            </p>

                            <p className="text-xs text-gray-400 mt-2">
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">
                        No reviews yet
                    </p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={() =>
                            onPageChange(currentPage - 1)
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="font-medium">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            onPageChange(currentPage + 1)
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Reviews;