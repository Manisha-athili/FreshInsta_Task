import Task from "../models/Task";

export const createTask = async (req, res) => {
    const task = await Task.create({
        title: req.body.title,
        userId: req.userId
    });
  
    res.status(201).json({
        message: "Task created successfully",
        task: task
    });
};

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json({
        message: "Tasks retrieved successfully",
        tasks: tasks
    });
};

export const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        { title: req.body.title, completed: req.body.completed },
        { new: true }
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task updated successfully",
        task: task
    });
};  

export const deleteTask = async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }   

}