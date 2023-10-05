const ProjectService = require('../services/projectService');
const projectService = new ProjectService();

class ProjectController {
  static async createProject(req, res) {
    try {
      const projectData = req.body;
      const project = await projectService.createProject(projectData);
      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getProjectDetails(req, res) {
    try {
      const projectId = req.params.projectId;
      const project = await projectService.getProjectDetails(projectId);
      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getAllProjects(req, res) {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async updateProjectDetails(req, res) {
    try {
      const projectId = req.params.projectId;
      const projectData = req.body;
      const updatedProject = await projectService.updateProjectDetails(projectId, projectData);
      res.status(200).json({
        success: true,
        data: updatedProject,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async deleteProject(req, res) {
    try {
      const projectId = req.params.projectId;
      await projectService.deleteProject(projectId);
      res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = ProjectController;