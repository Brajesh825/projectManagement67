const Permission = require('../models/permissionModel');

class PermissionService {
  // Creates a new permission in the database
  async createPermission(permissionData) {
    try {
      const permission = await Permission.create(permissionData);
      return permission;
    } catch (error) {
      throw new Error('Failed to create permission');
    }
  }

  // Updates permission details in the database
  async updatePermissionDetails(permissionId, permissionData) {
    try {
      const permission = await Permission.findByIdAndUpdate(
        permissionId,
        permissionData,
        { new: true }
      );
      return permission;
    } catch (error) {
      throw new Error('Failed to update permission details');
    }
  }

  // Retrieves permission details from the database
  async getPermissionDetails(permissionId) {
    try {
      const permission = await Permission.findById(permissionId);
      return permission;
    } catch (error) {
      throw new Error('Failed to fetch permission details');
    }
  }

  // Retrieves all permissions from the database
  async getAllPermissions() {
    try {
      const permissions = await Permission.find();
      return permissions;
    } catch (error) {
      throw new Error('Failed to fetch permissions');
    }
  }

  // Deletes a permission from the database
  async deletePermission(permissionId) {
    try {
      const deletedPermission = await Permission.findByIdAndRemove(permissionId);
      return deletedPermission;
    } catch (error) {
      throw new Error('Failed to delete permission');
    }
  }
}

module.exports = PermissionService;