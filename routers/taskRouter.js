const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");

// Create a new task
router.post("/projects/:projectId/tasks", TaskController.createTask);

// Update task details
router.put("/tasks/:taskId", TaskController.updateTaskDetails);

// Get task details
router.get("/tasks/:taskId", TaskController.getTaskDetails);

// Get all tasks
router.get("/tasks", TaskController.getAllTasks);

// Delete a task
router.delete("/tasks/:taskId", TaskController.deleteTask);

module.exports = router;