const express = require('express');
const Restaurant = require('../models/restaurant');


exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne(); // Retrieve the single restaurant
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json({ isOpen: restaurant.isOpen });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.updateRestaurant = async (req, res) => {
  const { isOpen } = req.body;
  if (typeof isOpen !== 'boolean') {
    return res.status(400).json({ error: 'isOpen must be a boolean' });
  }

  try {
    const restaurant = await Restaurant.findOne(); // Retrieve the single restaurant
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    restaurant.isOpen = isOpen;
    await restaurant.save();

    res.status(200).json({
      message: `Restaurant is now ${isOpen ? 'open' : 'closed'}`,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

