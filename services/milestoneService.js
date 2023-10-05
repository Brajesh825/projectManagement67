const Milestone = require('../models/milestoneModel');

class MilestoneService {
  // Creates a new milestone in the database
  async createMilestone(projectId, milestoneData) {
    try {
      const milestone = await Milestone.create({projectId, ...milestoneData});
      return milestone;
    } catch (error) {
      throw new Error('Failed to create milestone');
    }
  }

  // Updates milestone details in the database
  async updateMilestoneDetails(milestoneId, milestoneData) {
    try {
      const milestone = await Milestone.findByIdAndUpdate(milestoneId, milestoneData, { new: true });
      return milestone;
    } catch (error) {
      throw new Error('Failed to update milestone details');
    }
  }

  // Retrieves milestone details from the database
  async getMilestoneDetails(milestoneId) {
    try {
      const milestone = await Milestone.findById(milestoneId);
      return milestone;
    } catch (error) {
      throw new Error('Failed to fetch milestone details');
    }
  }

  // Retrieves all milestones from the database
  async getAllMilestones() {
    try {
      const milestones = await Milestone.find();
      return milestones;
    } catch (error) {
      throw new Error('Failed to fetch milestones');
    }
  }

  // Deletes a milestone from the database
  async deleteMilestone(milestoneId) {
    try {
      const deletedMilestone = await Milestone.findByIdAndRemove(milestoneId);
      return deletedMilestone;
    } catch (error) {
      throw new Error('Failed to delete milestone');
    }
  }
}

module.exports = MilestoneService;