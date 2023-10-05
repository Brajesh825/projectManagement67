const Project = require('../models/projectModel');

class ProjectService {
  // Creates a new project in the database
  async createProject(projectData) {
    try {
      const project = await Project.create(projectData);
      return project;
    } catch (error) {
      throw new Error('Failed to create project');
    }
  }

  // Retrieves project details from the database
  async getProjectDetails(projectId) {
    try {
      const project = await Project.findById(projectId);
      return project;
    } catch (error) {
      throw new Error('Failed to fetch project details');
    }
  }

  // Retrieves all projects from the database
  async getAllProjects() {
    try {
      const projects = await Project.find();
      return projects;
    } catch (error) {
      throw new Error('Failed to fetch projects');
    }
  }

  // Updates project details in the database
  async updateProjectDetails(projectId, projectData) {
    try {
      const project = await Project.findByIdAndUpdate(projectId, projectData, { new: true });
      return project;
    } catch (error) {
      throw new Error('Failed to update project details');
    }
  }

  // Deletes a project from the database
  async deleteProject(projectId) {
    try {
      const deletedProject = await Project.findByIdAndRemove(projectId);
      return deletedProject;
    } catch (error) {
      throw new Error('Failed to delete project');
    }
  }
}

module.exports = ProjectService;