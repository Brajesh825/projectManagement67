const express = require('express');
  const MilestoneController = require('../controllers/milestoneController');

  const router = express.Router();

  // Create a new milestone
  router.post('/projects/:projectId/milestones', MilestoneController.createMilestone);

  // Get milestone details
  router.get('/milestones/:milestoneId', MilestoneController.getMilestoneDetails);

  // Get all milestones
  router.get('/milestones', MilestoneController.getAllMilestones);

  // Update milestone details
  router.put('/milestones/:milestoneId', MilestoneController.updateMilestoneDetails);

  // Delete a milestone
  router.delete('/milestones/:milestoneId', MilestoneController.deleteMilestone);

  module.exports = router;