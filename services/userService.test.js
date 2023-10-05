const mongoose = require('mongoose');
const User = require('../models/userModel');
const UserService = require('./userService');

describe('UserService', () => {
  let userService;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    userService = new UserService();
    await User.deleteMany(); // Empty the user collection in the test database
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Test data for creating a user
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123',
        roleId: new mongoose.Types.ObjectId(),
      };

      const createdUser = await userService.createUser(userData);

      expect(createdUser).toBeTruthy();
      expect(createdUser.firstName).toEqual(userData.firstName);
      expect(createdUser.lastName).toEqual(userData.lastName);
      expect(createdUser.email).toEqual(userData.email);
      expect(createdUser.username).toEqual(userData.username);
      expect(createdUser.password).toEqual(userData.password);
      expect(createdUser.roleId).toEqual(userData.roleId);
    });
  });

  describe('getUserDetails', () => {
    it('should retrieve user details', async () => {
      // Create a user to retrieve details
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123',
        roleId: new mongoose.Types.ObjectId(),
      };
      const createdUser = await User.create(userData);

      const retrievedUser = await userService.getUserDetails(createdUser._id);

      expect(retrievedUser).toBeTruthy();
      expect(retrievedUser.firstName).toEqual(userData.firstName);
      expect(retrievedUser.lastName).toEqual(userData.lastName);
      expect(retrievedUser.email).toEqual(userData.email);
      expect(retrievedUser.username).toEqual(userData.username);
      expect(retrievedUser.password).toEqual(userData.password);
      expect(retrievedUser.roleId).toEqual(userData.roleId);
    });
  });

  describe('getAllUsers', () => {
    it('should retrieve all users', async () => {
      // Create multiple users
      const user1 = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123',
        roleId: new mongoose.Types.ObjectId(),
      };
      const user2 = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        username: 'janedoe',
        password: 'password123',
        roleId: new mongoose.Types.ObjectId(),
      };
      await User.insertMany([user1, user2]);

      const users = await userService.getAllUsers();
      expect(users).toHaveLength(2);
    });
  });

  describe('updateUserDetails', () => {
    it('should update user details', async () => {
      // Create a user to update
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123',
        roleId: new mongoose.Types.ObjectId(),
      };
      const createdUser = await User.create(userData);

      // Updated user details
      const updatedUserData = {
        firstName: 'John Updated',
        lastName: 'Doe Updated',
        email: 'johndoeupdated@example.com',
      };

      const updatedUser = await userService.updateUserDetails(createdUser._id, updatedUserData);

      expect(updatedUser).toBeTruthy();
      expect(updatedUser.firstName).toEqual(updatedUserData.firstName);
      expect(updatedUser.lastName).toEqual(updatedUserData.lastName);
      expect(updatedUser.email).toEqual(updatedUserData.email);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      // Create a user to delete
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123',
        roleId: new mongoose.Types.ObjectId(),
      };
      const createdUser = await User.create(userData);

      const deletedUser = await userService.deleteUser(createdUser._id);
      expect(deletedUser._id).toEqual(createdUser._id);

      const retrievedUser = await User.findById(createdUser._id);
      expect(retrievedUser).toBeFalsy();
    });
  });
});