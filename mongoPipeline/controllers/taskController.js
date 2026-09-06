import mongoose from "mongoose";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({
      message: "Task Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const userWithTasks = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "userId",
          as: "tasks",
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const topUsers = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "userId",
          as: "tasks",
        },
      },
      {
        $project: {
          name: 1,
          totalTasks: {
            $size: "$tasks",
          },
        },
      },
      {
        $sort: {
          totalTasks: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchTasks = async (req, res) => {
  try {
    const { status, priority, keyword } = req.query;

    const match = {
      userId: new mongoose.Types.ObjectId(
        req.user.id
      ),
    };

    if (status) {
      match.status = status;
    }

    if (priority) {
      match.priority = priority;
    }

    if (keyword) {
      match.title = {
        $regex: `^${keyword}`,
        $options: "i",
      };
    }

    const tasks = await Task.aggregate([
      {
        $match: match,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          status: 1,
          priority: 1,
          dueDate: 1,
          userId: 1,
        },
      },
    ]);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};