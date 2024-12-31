const { io } = require('./socketController')  // Import io
const Product = require('../models/product');



exports.addProduct = async (req, res) => {
  try {
    const { itemName, itemPrice, quantity, description, category, images, popular, recommend, isAdditional, additional, isAvailable } = req.body
    const product = new Product({ itemName, itemPrice, quantity, description, category, popular, isAdditional, recommend, images, additional, isAvailable });
    await product.save();
    return res.status(201).send(product);
  } catch (e) {
  }
}

exports.products = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}

exports.newProduct = async (req, res) => {
  try {
    const product = await Product.find({ popular: true });
    if (!product || product.length == 0) {
      return res.status(404).json({ msg: 'Products not found' });
    } else {
      return res.status(200).json({ product });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.recommended = async (req, res) => {
  try {
    const product = await Product.find({ recommend: true });
    if (!product || product.length == 0) {
      return res.status(404).json({ msg: 'Products not found' });
    } else {
      return res.status(200).json({ product });
    }
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}

exports.productsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error loading Products', error });
  }
}

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the existing product first
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update only fields that are provided in the request body
    const updatedFields = {
      itemName: req.body.itemName || product.itemName,
      itemPrice: req.body.itemPrice || product.itemPrice,
      description: req.body.description || product.description,
      images: req.body.images || product.images,
      popular: req.body.popular || product.popular,
      quantity: req.body.quantity || product.quantity,
      recommend: req.body.recommend || product.recommend,
      additional: req.body.additional || product.additional,
    };

    // Update the product with new values
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error); // Logs detailed error in the server console
    return res.status(500).json({
      message: 'Server error occurred while deleting the product',
      error: error.message  // Includes the specific error message in the response
    });

  }

}

exports.availability = async (req, res) => {
  const { isAvailable } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { isAvailable },
      { new: true }
    );

   

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Emit event to notify user app(s) of the updated product availability   productAvailabilityUpdated
    // Emit an event to notify the user app(s)

  

    res.json({ message: 'Product availability updated', product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: 'Server error', error });
  }
}
