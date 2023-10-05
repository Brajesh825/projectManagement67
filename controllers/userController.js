const UserService = require('../services/userService');
const userService = new UserService();

class UserController {
  static async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await userService.createUser(userData);
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getUserDetails(req, res) {
    try {
      const userId = req.params.userId;
      const user = await userService.getUserDetails(userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async updateUserDetails(req, res) {
    try {
      const userId = req.params.userId;
      const userData = req.body;
      const updatedUser = await userService.updateUserDetails(userId, userData);
      res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      await userService.deleteUser(userId);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = UserController;