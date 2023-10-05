const mongoose = require('mongoose');
const Permission = require('../models/permissionModel');
const PermissionService = require('./permissionService');

describe('PermissionService', () => {
  let permissionService;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    permissionService = new PermissionService();
    await Permission.deleteMany(); // Empty the permission collection in the test database
  });

  describe('createPermission', () => {
    it('should create a new permission', async () => {
      // Test data for creating a permission
      const permissionData = {
        permissionName: 'Test Permission',
      };

      const createdPermission = await permissionService.createPermission(permissionData);

      expect(createdPermission).toBeTruthy();
      expect(createdPermission.permissionName).toEqual(permissionData.permissionName);
    });
  });

  describe('updatePermissionDetails', () => {
    it('should update permission details', async () => {
      // Create a permission to update
      const permissionData = {
        permissionName: 'Test Permission',
      };
      const createdPermission = await Permission.create(permissionData);

      // Updated permission details
      const updatedPermissionData = {
        permissionName: 'Updated Test Permission',
      };

      const updatedPermission = await permissionService.updatePermissionDetails(createdPermission._id, updatedPermissionData);

      expect(updatedPermission).toBeTruthy();
      expect(updatedPermission.permissionName).toEqual(updatedPermissionData.permissionName);
    });
  });

  describe('getPermissionDetails', () => {
    it('should retrieve permission details', async () => {
      // Create a permission to retrieve details
      const permissionData = {
        permissionName: 'Test Permission',
      };
      const createdPermission = await Permission.create(permissionData);

      const retrievedPermission = await permissionService.getPermissionDetails(createdPermission._id);

      expect(retrievedPermission).toBeTruthy();
      expect(retrievedPermission.permissionName).toEqual(permissionData.permissionName);
    });
  });

  describe('getAllPermissions', () => {
    it('should retrieve all permissions', async () => {
      // Create multiple permissions
      const permission1 = {
        permissionName: 'Permission 1',
      };
      const permission2 = {
        permissionName: 'Permission 2',
      };
      await Permission.insertMany([permission1, permission2]);

      const permissions = await permissionService.getAllPermissions();
      expect(permissions).toHaveLength(2);
    });
  });

  describe('deletePermission', () => {
    it('should delete a permission', async () => {
      // Create a permission to delete
      const permissionData = {
        permissionName: 'Test Permission',
      };
      const createdPermission = await Permission.create(permissionData);

      const deletedPermission = await permissionService.deletePermission(createdPermission._id);
      expect(deletedPermission._id).toEqual(createdPermission._id);

      const retrievedPermission = await Permission.findById(createdPermission._id);
      expect(retrievedPermission).toBeFalsy();
    });
  });
});