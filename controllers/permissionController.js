const PermissionService = require('../services/permissionService');
const permissionService = new PermissionService();

class PermissionController {
  static async createPermission(req, res) {
    try {
      const permissionData = req.body;
      const permission = await permissionService.createPermission(permissionData);
      res.status(201).json({
        success: true,
        data: permission,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async updatePermissionDetails(req, res) {
    try {
      const permissionId = req.params.permissionId;
      const permissionData = req.body;
      const updatedPermission = await permissionService.updatePermissionDetails(permissionId, permissionData);
      res.status(200).json({
        success: true,
        data: updatedPermission,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getPermissionDetails(req, res) {
    try {
      const permissionId = req.params.permissionId;
      const permission = await permissionService.getPermissionDetails(permissionId);
      res.status(200).json({
        success: true,
        data: permission,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getAllPermissions(req, res) {
    try {
      const permissions = await permissionService.getAllPermissions();
      res.status(200).json({
        success: true,
        data: permissions,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async deletePermission(req, res) {
    try {
      const permissionId = req.params.permissionId;
      await permissionService.deletePermission(permissionId);
      res.status(200).json({
        success: true,
        message: 'Permission deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = PermissionController;