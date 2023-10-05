const Task = require('../models/taskModel');

class TaskService {
  // Creates a new task in the database
  async createTask(projectId, taskData) {
    try {
      const task = await Task.create({
        projectId,
        ...taskData
      });
      return task;
    } catch (error) {
      throw new Error('Failed to create task');
    }
  }

  // Updates task details in the database
  async updateTaskDetails(taskId, taskData) {
    try {
      const task = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
      return task;
    } catch (error) {
      throw new Error('Failed to update task details');
    }
  }

  // Retrieves task details from the database
  async getTaskDetails(taskId) {
    try {
      const task = await Task.findById(taskId);
      return task;
    } catch (error) {
      throw new Error('Failed to fetch task details');
    }
  }

  // Retrieves all tasks from the database
  async getAllTasks() {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (error) {
      throw new Error('Failed to fetch tasks');
    }
  }

  // Deletes a task from the database
  async deleteTask(taskId) {
    try {
      const deletedTask = await Task.findByIdAndRemove(taskId);
      return deletedTask;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }
}

module.exports = TaskService;