const mongoose = require('mongoose');
const Task = require('../models/taskModel');
const TaskService = require('./taskService');

describe('TaskService', () => {
  let taskService;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    taskService = new TaskService();
    await Task.deleteMany(); // Empty the task collection in the test database
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      // Test data for creating a task
      const taskData = {
        taskName: 'Test Task',
        projectId: new mongoose.Types.ObjectId(),
        assignedTo: new mongoose.Types.ObjectId(),
        priority: 'High',
        deadline: new Date(),
        dueDate: new Date(),
        status: 'Pending',
        dependency: [],
      };

      const createdTask = await taskService.createTask(taskData.projectId, taskData);

      expect(createdTask).toBeTruthy();
      expect(createdTask.taskName).toEqual(taskData.taskName);
      expect(createdTask.projectId).toEqual(taskData.projectId);
      expect(createdTask.assignedTo).toEqual(taskData.assignedTo);
      expect(createdTask.priority).toEqual(taskData.priority);
      expect(createdTask.deadline).toEqual(taskData.deadline);
      expect(createdTask.dueDate).toEqual(taskData.dueDate);
      expect(createdTask.status).toEqual(taskData.status);
    });
  });

  describe('updateTaskDetails', () => {
    it('should update task details', async () => {
      // Create a task to update
      const taskData = {
        taskName: 'Test Task',
        projectId: new mongoose.Types.ObjectId(),
        assignedTo: new mongoose.Types.ObjectId(),
        priority: 'High',
        deadline: new Date(),
        dueDate: new Date(),
        status: 'Pending',
        dependency: [],
      };
      const createdTask = await Task.create(taskData);

      // Updated task details
      const updatedTaskData = {
        taskName: 'Updated Test Task',
        status: 'Completed',
      };

      const updatedTask = await taskService.updateTaskDetails(createdTask._id, updatedTaskData);

      expect(updatedTask).toBeTruthy();
      expect(updatedTask.taskName).toEqual(updatedTaskData.taskName);
      expect(updatedTask.status).toEqual(updatedTaskData.status);
    });
  });

  describe('getTaskDetails', () => {
    it('should retrieve task details', async () => {
      // Create a task to retrieve details
      const taskData = {
        taskName: 'Test Task',
        projectId: new mongoose.Types.ObjectId(),
        assignedTo: new mongoose.Types.ObjectId(),
        priority: 'High',
        deadline: new Date(),
        dueDate: new Date(),
        status: 'Pending',
        dependency: [],
      };
      const createdTask = await Task.create(taskData);

      const retrievedTask = await taskService.getTaskDetails(createdTask._id);

      expect(retrievedTask).toBeTruthy();
      expect(retrievedTask.taskName).toEqual(taskData.taskName);
      expect(retrievedTask.status).toEqual(taskData.status);
    });
  });

  describe('getAllTasks', () => {
    it('should retrieve all tasks', async () => {
      // Create multiple tasks
      const task1 = {
        taskName: 'Task 1',
        projectId: new mongoose.Types.ObjectId(),
        assignedTo: new mongoose.Types.ObjectId(),
        priority: 'High',
        deadline: new Date(),
        dueDate: new Date(),
        status: 'Pending',
        dependency: [],
      };
      const task2 = {
        taskName: 'Task 2',
        projectId: new mongoose.Types.ObjectId(),
        assignedTo: new mongoose.Types.ObjectId(),
        priority: 'Medium',
        deadline: new Date(),
        dueDate: new Date(),
        status: 'InProgress',
        dependency: [],
      };
      await Task.insertMany([task1, task2]);

      const tasks = await taskService.getAllTasks();
      expect(tasks).toHaveLength(2);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      // Create a task to delete
      const taskData = {
        taskName: 'Test Task',
        projectId: new mongoose.Types.ObjectId(),
        assignedTo: new mongoose.Types.ObjectId(),
        priority: 'High',
        deadline: new Date(),
        dueDate: new Date(),
        status: 'Pending',
        dependency: [],
      };
      const createdTask = await Task.create(taskData);

      const deletedTask = await taskService.deleteTask(createdTask._id);
      expect(deletedTask._id).toEqual(createdTask._id);

      const retrievedTask = await Task.findById(createdTask._id);
      expect(retrievedTask).toBeFalsy();
    });
  });
});