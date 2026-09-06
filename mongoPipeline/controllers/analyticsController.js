import Task from "../models/Task.js";

export const taskByStatus = async (req, res) => {
    const data = await Task.aggregate([
        {
            $group: {
                _id: "$status",
                total: { $sum: 1 }
            }
        }
    ]);

    res.json(data);
};

export const taskByPriority = async (req, res) => {
    const data = await Task.aggregate([
        {
            $group: {
                _id: "$priority",
                total: { $sum: 1 }
            }
        }
    ]);

    res.json(data);
};

export const completedVsPending = async (req, res) => {
    const data = await Task.aggregate([
        {
            $match: {
                status: {
                    $in: ["completed", "pending"]
                }
            }
        },
        {
            $group: {
                _id: "$status",
                total: { $sum: 1 }
            }
        }
    ]);

    res.json(data);
};


export const monthlyReport = async (req, res) => {
    const data = await Task.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt" },
                total: { $sum: 1 }
            }
        }
    ]);

    res.json(data);
};

export const upcomingTasks = async (req, res) => {
    const today = new Date();

    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const data = await Task.aggregate([
        {
            $match: {
                dueDate: {
                    $gte: today,
                    $lte: next7Days
                }
            }
        }
    ]);

    res.json(data);
};