const Category = require('../models/category');

exports.uploadCategory = async (req, res) => {
  try {
    const { name, image, banner } = req.body;
    const category = new Category({ name, image, banner });
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // Get the category ID from the request parameters

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


