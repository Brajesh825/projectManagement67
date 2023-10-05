const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/permissionController');

// Create Permission
router.post("/permissions", PermissionController.createPermission);

// Get Permission Details
router.get("/permissions/:permissionId", PermissionController.getPermissionDetails);

// Get All Permissions
router.get("/permissions", PermissionController.getAllPermissions);

// Update Permission Details
router.put("/permissions/:permissionId", PermissionController.updatePermissionDetails);

// Delete Permission
router.delete("/permissions/:permissionId", PermissionController.deletePermission);

module.exports = router;