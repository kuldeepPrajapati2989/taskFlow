const MonthlyReport = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
                Monthly Report
            </h2>

            <div className="space-y-3">
                {data.map((item) => (
                    <div
                        key={item._id.month}
                        className="flex justify-between border-b pb-2"
                    >
                        <span>
                            Month {item._id.month}
                        </span>

                        <span className="font-bold">
                            {item.totalTasks}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlyReport;