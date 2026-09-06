
import { useState, useEffect } from "react";

const CreateTaskModal = ({
    isOpen,
    onClose,
    onTaskCreated,
    task,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
            setDescription(task.description || "");
            setStatus(task.status || "pending");
            setPriority(task.priority || "medium");

            setDueDate(
                task.dueDate
                    ? task.dueDate.split("T")[0]
                    : ""
            );
        } else {
            const defaultDate = new Date();
            defaultDate.setDate(defaultDate.getDate() + 2);

            setTitle("");
            setDescription("");
            setStatus("pending");
            setPriority("medium");
            setDueDate(
                defaultDate.toISOString().split("T")[0]
            );
        }
    }, [task]);

    const createTask = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        status,
                        priority,
                        dueDate,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onTaskCreated();
            onClose();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        status,
                        priority,
                        dueDate,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onTaskCreated();
            onClose();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {task
                            ? "Update Task"
                            : "Create New Task"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={
                        task
                            ? updateTask
                            : createTask
                    }
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        className="w-full border rounded-lg p-3 h-28"
                    />

                    <div className="grid md:grid-cols-3 gap-3">

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="border rounded-lg p-3"
                        >
                            <option value="pending">
                                Pending
                            </option>

                            <option value="completed">
                                Completed
                            </option>
                        </select>

                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
                            }
                            className="border rounded-lg p-3"
                        >
                            <option value="low">
                                Low
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="high">
                                High
                            </option>
                        </select>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                            className="border rounded-lg p-3"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >
                        {loading
                            ? "Please Wait..."
                            : task
                                ? "Update Task"
                                : "Create Task"}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default CreateTaskModal;

