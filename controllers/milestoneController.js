const MilestoneService = require('../services/milestoneService');
const milestoneService = new MilestoneService();

class MilestoneController {
  static async createMilestone(req, res) {
    try {
      const projectId = req.params.projectId;
      const milestoneData = req.body;
      const milestone = await milestoneService.createMilestone(projectId, milestoneData);
      res.status(201).json({
        success: true,
        data: milestone,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async updateMilestoneDetails(req, res) {
    try {
      const milestoneId = req.params.milestoneId;
      const milestoneData = req.body;
      const updatedMilestone = await milestoneService.updateMilestoneDetails(
        milestoneId,
        milestoneData
      );
      res.status(200).json({
        success: true,
        data: updatedMilestone,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getMilestoneDetails(req, res) {
    try {
      const milestoneId = req.params.milestoneId;
      const milestone = await milestoneService.getMilestoneDetails(milestoneId);
      res.status(200).json({
        success: true,
        data: milestone,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getAllMilestones(req, res) {
    try {
      const milestones = await milestoneService.getAllMilestones();
      res.status(200).json({
        success: true,
        data: milestones,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async deleteMilestone(req, res) {
    try {
      const milestoneId = req.params.milestoneId;
      await milestoneService.deleteMilestone(milestoneId);
      res.status(200).json({
        success: true,
        message: 'Milestone deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = MilestoneController;