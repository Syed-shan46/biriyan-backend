const express = require('express');
const router = express.Router;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user with phone number
exports.createUser = async (req, res) => {
  try {
    const { phone } = req.body;

    // Check if user already exists with the phone number
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    // Create a new user with phone number only
    const newUser = new User({ phone });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
};

// controllers/userController.js (add this to the existing controller)
exports.editUser = async (req, res) => {
  try {
    const { phone, username, email } = req.body;

    // Find user by phone number and update the username and email
    const updatedUser = await User.findOneAndUpdate(
      { phone },
      { username, email },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the user' });
  }
};

exports.checkUser = async (req, res) => {
  const { phone } = req.body;

  try {
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Check if user with the provided phone number exists
    let user = await User.findOne({ phone });

    if (user) {
      // User exists, generate token
      const token = jwt.sign({ id: user._id }, 'passwordKey');
      return res.status(200).json({ user, token });
    }

    // User not found, create a new user
    user = new User({ phone });
    await user.save();

    // Generate token for the new user
    const token = jwt.sign({ id: user._id }, 'passwordKey');

    // Return the newly created user and token
    return res.status(201).json({ message: 'User created successfully', user, token });
  } catch (error) {
    console.error('Error checking/creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUsername = async (req, res) => {
  const { phone, username } = req.body;

  if (!phone || !username) {
    return res.status(400).json({ message: 'Phone number and username are required' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { phone },
      { username },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Username updated successfully', user });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Fetch user by userId
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


