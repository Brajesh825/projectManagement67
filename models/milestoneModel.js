const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  milestoneName: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;