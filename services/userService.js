const User = require('../models/userModel');

class UserService {
  // Creates a new user in the database
  async createUser(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  // Retrieves user details from the database
  async getUserDetails(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Failed to fetch user details');
    }
  }

  // Retrieves all users from the database
  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  // Updates user details in the database
  async updateUserDetails(userId, userData) {
    try {
      const user = await User.findByIdAndUpdate(userId, userData, { new: true });
      return user;
    } catch (error) {
      throw new Error('Failed to update user details');
    }
  }

  // Deletes a user from the database
  async deleteUser(userId) {
    try {
      const deletedUser = await User.findByIdAndRemove(userId);
      return deletedUser;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

module.exports = UserService;