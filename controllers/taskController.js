const TaskService = require('../services/taskService');
const taskService = new TaskService();

class TaskController {
  static async createTask(req, res) {
    try {
      const projectId = req.params.projectId;
      const taskData = req.body;
      const task = await taskService.createTask(projectId, taskData);
      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async updateTaskDetails(req, res) {
    try {
      const taskId = req.params.taskId;
      const taskData = req.body;
      const updatedTask = await taskService.updateTaskDetails(taskId, taskData);
      res.status(200).json({
        success: true,
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getTaskDetails(req, res) {
    try {
      const taskId = req.params.taskId;
      const task = await taskService.getTaskDetails(taskId);
      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async deleteTask(req, res) {
    try {
      const taskId = req.params.taskId;
      await taskService.deleteTask(taskId);
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = TaskController;