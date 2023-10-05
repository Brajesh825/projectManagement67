const mongoose = require('mongoose');
const Milestone = require('../models/milestoneModel');
const MilestoneService = require('./milestoneService');

describe('MilestoneService', () => {
  let milestoneService;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    milestoneService = new MilestoneService();
    await Milestone.deleteMany();
  });

  describe('createMilestone', () => {
    it('should create a new milestone', async () => {
      // Test data for creating a milestone
      const milestoneData = {
        milestoneName: 'Test Milestone',
        projectId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        status: 'InProgress',
      };

      const createdMilestone = await milestoneService.createMilestone(milestoneData.projectId, milestoneData);

      expect(createdMilestone).toBeTruthy();
      expect(createdMilestone.milestoneName).toEqual(milestoneData.milestoneName);
      expect(createdMilestone.projectId).toEqual(milestoneData.projectId);
      expect(createdMilestone.startDate).toEqual(milestoneData.startDate);
      expect(createdMilestone.endDate).toEqual(milestoneData.endDate);
      expect(createdMilestone.status).toEqual(milestoneData.status);
    });
  });

  describe('updateMilestoneDetails', () => {
    it('should update milestone details', async () => {
      // Create a milestone to update
      const milestoneData = {
        milestoneName: 'Test Milestone',
        projectId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        status: 'InProgress',
      };
      const createdMilestone = await Milestone.create(milestoneData);

      // Updated milestone details
      const updatedMilestoneData = {
        milestoneName: 'Updated Test Milestone',
        status: 'Completed',
      };

      const updatedMilestone = await milestoneService.updateMilestoneDetails(createdMilestone._id, updatedMilestoneData);

      expect(updatedMilestone).toBeTruthy();
      expect(updatedMilestone.milestoneName).toEqual(updatedMilestoneData.milestoneName);
      expect(updatedMilestone.status).toEqual(updatedMilestoneData.status);
    });
  });

  describe('getMilestoneDetails', () => {
    it('should retrieve milestone details', async () => {
      // Create a milestone to retrieve details
      const milestoneData = {
        milestoneName: 'Test Milestone',
        projectId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        status: 'InProgress',
      };
      const createdMilestone = await Milestone.create(milestoneData);

      const retrievedMilestone = await milestoneService.getMilestoneDetails(createdMilestone._id);

      expect(retrievedMilestone).toBeTruthy();
      expect(retrievedMilestone.milestoneName).toEqual(milestoneData.milestoneName);
      expect(retrievedMilestone.status).toEqual(milestoneData.status);
    });
  });

  describe('getAllMilestones', () => {
    it('should retrieve all milestones', async () => {
      // Create multiple milestones
      const milestone1 = {
        milestoneName: 'Milestone 1',
        projectId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        status: 'InProgress',
      };
      const milestone2 = {
        milestoneName: 'Milestone 2',
        projectId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        status: 'Completed',
      };
      await Milestone.insertMany([milestone1, milestone2]);

      const milestones = await milestoneService.getAllMilestones();
      expect(milestones).toHaveLength(2);
    });
  });

  describe('deleteMilestone', () => {
    it('should delete a milestone', async () => {
      // Create a milestone to delete
      const milestoneData = {
        milestoneName: 'Test Milestone',
        projectId: new mongoose.Types.ObjectId(),
        startDate: new Date(),
        endDate: new Date(),
        status: 'InProgress',
      };
      const createdMilestone = await Milestone.create(milestoneData);

      const deletedMilestone = await milestoneService.deleteMilestone(createdMilestone._id);
      expect(deletedMilestone._id).toEqual(createdMilestone._id);

      const retrievedMilestone = await Milestone.findById(createdMilestone._id);
      expect(retrievedMilestone).toBeFalsy();
    });
  });
});