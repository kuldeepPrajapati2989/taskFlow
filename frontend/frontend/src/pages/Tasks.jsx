import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CreateTaskModal from "../components/CreateTaskModal";

const Tasks = ({ setToken }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");

            const url = search
                ? `https://taskflow-backend-1-k24g.onrender.com/api/tasks/search?keyword=${search}`
                : "https://taskflow-backend-1-k24g.onrender.com/api/tasks";

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            setTasks(data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [search]);



    const handleEdit = (task) => {
        setSelectedTask(task);
        setOpenModal(true);
    };

    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await fetch(
                `https://taskflow-backend-1-k24g.onrender.com/api/tasks/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTasks();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout setToken={setToken}>

            <div className="max-w-7xl mx-auto px-5 py-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        My Tasks
                    </h1>
                    <input
                        type="text"
                        placeholder="Search Tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-72"
                    />
                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        + Create Task
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow overflow-hidden">

                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Priority</th>
                                <th className="p-4 text-left">Due Date</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map((task) => (
                                <tr
                                    key={task._id}
                                    className="border-t hover:bg-slate-50"
                                >
                                    <td className="p-4">
                                        {task.title}
                                    </td>

                                    <td className="p-4">
                                        {task.status}
                                    </td>

                                    <td className="p-4">
                                        {task.priority}
                                    </td>

                                    <td className="p-4">
                                        {task.dueDate
                                            ? new Date(task.dueDate).toLocaleDateString()
                                            : "N/A"}
                                    </td>

                                    <td className="p-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                {/* Modal */}
                <CreateTaskModal
                    isOpen={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedTask(null);
                    }}
                    onTaskCreated={fetchTasks}
                    task={selectedTask}
                />

            </div>
        </MainLayout>
    );
};

export default Tasks;
