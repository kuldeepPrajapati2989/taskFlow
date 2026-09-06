const TopUsers = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
                Top Users
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">
                                Name
                            </th>

                            <th className="text-left py-2">
                                Email
                            </th>

                            <th className="text-left py-2">
                                Tasks
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((user, index) => (
                            <tr
                                key={index}
                                className="border-b"
                            >
                                <td className="py-2">
                                    {user.name}
                                </td>

                                <td className="py-2">
                                    {user.email}
                                </td>

                                <td className="py-2 font-bold">
                                    {user.totalTasks}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopUsers;