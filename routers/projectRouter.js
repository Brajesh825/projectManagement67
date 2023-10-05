// Import required modules
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/projects', projectController.createProject);

// Get project details
router.get('/projects/:projectId', projectController.getProjectDetails);

// Get all projects
router.get('/projects', projectController.getAllProjects);

// Update project details
router.put('/projects/:projectId', projectController.updateProjectDetails);

// Delete a project
router.delete('/projects/:projectId', projectController.deleteProject);

module.exports = router;