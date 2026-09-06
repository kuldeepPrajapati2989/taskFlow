const PriorityStats = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
                Priority Statistics
            </h2>

            <div className="space-y-3">
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="flex justify-between border-b pb-2"
                    >
                        <span className="capitalize">
                            {item._id}
                        </span>

                        <span className="font-bold">
                            {item.count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriorityStats;