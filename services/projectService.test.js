const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const ProjectService = require('./projectService');

describe('ProjectService', () => {
  let projectService;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    projectService = new ProjectService();
    await Project.deleteMany(); // Empty the project collection in the test database
  });

  describe('createProject', () => {
    it('should create a new project', async () => {
      // Test data for creating a project
      const projectData = {
        projectName: 'Test Project',
        projectLeadId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        budget: 1000,
        description: 'Test description',
      };

      const createdProject = await projectService.createProject(projectData);

      expect(createdProject).toBeTruthy();
      expect(createdProject.projectName).toEqual(projectData.projectName);
      expect(createdProject.projectLeadId).toEqual(projectData.projectLeadId);
      expect(createdProject.startDate).toEqual(projectData.startDate);
      expect(createdProject.endDate).toEqual(projectData.endDate);
      expect(createdProject.budget).toEqual(projectData.budget);
      expect(createdProject.description).toEqual(projectData.description);
    });
  });

  describe('getProjectDetails', () => {
    it('should retrieve project details', async () => {
      // Create a project to retrieve details
      const projectData = {
        projectName: 'Test Project',
        projectLeadId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        budget: 1000,
        description: 'Test description',
      };
      const createdProject = await Project.create(projectData);

      const retrievedProject = await projectService.getProjectDetails(createdProject._id);

      expect(retrievedProject).toBeTruthy();
      expect(retrievedProject.projectName).toEqual(projectData.projectName);
      expect(retrievedProject.projectLeadId).toEqual(projectData.projectLeadId);
      expect(retrievedProject.startDate).toEqual(projectData.startDate);
      expect(retrievedProject.endDate).toEqual(projectData.endDate);
      expect(retrievedProject.budget).toEqual(projectData.budget);
      expect(retrievedProject.description).toEqual(projectData.description);
    });
  });

  describe('getAllProjects', () => {
    it('should retrieve all projects', async () => {
      // Create multiple projects
      const project1 = {
        projectName: 'Project 1',
        projectLeadId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        budget: 1000,
        description: 'Description 1',
      };
      const project2 = {
        projectName: 'Project 2',
        projectLeadId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        budget: 2000,
        description: 'Description 2',
      };
      await Project.insertMany([project1, project2]);

      const projects = await projectService.getAllProjects();
      expect(projects).toHaveLength(2);
    });
  });

  describe('updateProjectDetails', () => {
    it('should update project details', async () => {
      // Create a project to update
      const projectData = {
        projectName: 'Test Project',
        projectLeadId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        budget: 1000,
        description: 'Test description',
      };
      const createdProject = await Project.create(projectData);

      // Updated project details
      const updatedProjectData = {
        projectName: 'Updated Test Project',
        budget: 2000,
      };

      const updatedProject = await projectService.updateProjectDetails(
        createdProject._id,
        updatedProjectData
      );

      expect(updatedProject).toBeTruthy();
      expect(updatedProject.projectName).toEqual(updatedProjectData.projectName);
      expect(updatedProject.budget).toEqual(updatedProjectData.budget);
    });
  });

  describe('deleteProject', () => {
    it('should delete a project', async () => {
      // Create a project to delete
      const projectData = {
        projectName: 'Test Project',
        projectLeadId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        budget: 1000,
        description: 'Test description',
      };
      const createdProject = await Project.create(projectData);

      const deletedProject = await projectService.deleteProject(createdProject._id);
      expect(deletedProject._id).toEqual(createdProject._id);

      const retrievedProject = await Project.findById(createdProject._id);
      expect(retrievedProject).toBeFalsy();
    });
  });
});