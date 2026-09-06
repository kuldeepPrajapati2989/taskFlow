const UpcomingTasks = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
                Upcoming Tasks
            </h2>

            <div className="space-y-3">
                {data.map((task) => (
                    <div
                        key={task._id}
                        className="border rounded-lg p-3"
                    >
                        <h3 className="font-semibold">
                            {task.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                            Priority: {task.priority}
                        </p>

                        <p className="text-sm text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingTasks;