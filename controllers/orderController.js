
const Order = require('../models/order');
const User = require('../models/user');
const { triggerIncomingCall } = require('./callController');
const { sendOrderNotification } = require('./notifications');
// Mock database
let orders = [];
exports.createOrder = async (req, res) => {
  try {
    const { userId, userName, phone, address, productName, quantity, category, image, totalAmount, paymentStatus, customerDeviceToken, orderStatus } = req.body;
    // Fetch the user's email from the User model using userId
    const user = await User.findById(userId).select('email userName');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userEmail = user.email; // Retrieve the email from the user object

    const createAt = new Date().getMilliseconds()

    // Create the products array (assuming one product per order for now)
    const products = [{
      name: productName,
      quantity: quantity,
      category: category,
      image: image,
      price: totalAmount, // Assuming the total amount is the product price
    }];

    // Create the order 
    const newOrder = new Order({
      userId,
      userName,
      phone,
      address,
      productName,
      quantity,
      category,
      image,
      totalAmount,
      paymentStatus,
      createAt,
      products,
      customerDeviceToken,
      orderStatus
    });

    await newOrder.save();
    orders.push(newOrder); // Save order to mock database

    try {
      // Send notification to admin app
      await sendOrderNotification(newOrder);
      res.status(201).json({ message: 'Order created successfully', order: newOrder });

    } catch (error) {
      console.error('Error processing order:', error);
      res.status(500).json({ success: false, message: 'Failed to create order' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
}


exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    if (orders.length == 0) {
      return res.status(404).json({ msg: 'No orders found for this ' })
    }

    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}

exports.getallOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })

    if (orders.length === 0) {
      return res.status(404).json({ msg: 'No Orders found' });
    }


    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Updated acceptOrder function
exports.acceptOrder = async (req, res) => {
  const { orderId } = req.body; // assuming you get the orderId from the request body

  try {
    // Retrieve the order by orderId and populate the 'userId' field to get the user's email and name
    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order status to "Accepted"
    order.orderStatus = 'Accepted';
    await order.save();
    res.status(200).json({ message: 'Order accepted and user notified via email' });

  } catch (error) {
    console.error('Error accepting order:', error);
    return res.status(500).json({ error: 'Failed to accept order' });
  }
};

// Updated acceptOrder function
exports.cancelOrder = async (req, res) => {
  const { orderId } = req.body; // assuming you get the orderId from the request body

  try {
    // Retrieve the order by orderId and populate the 'userId' field to get the user's email and name
    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order status to "Accepted"
    order.orderStatus = 'Cancelled';
    await order.save();
    res.status(200).json({ message: 'Order accepted and user notified via email' });

  } catch (error) {
    console.error('Error accepting order:', error);
    return res.status(500).json({ error: 'Failed to accept order' });
  }
};

exports.getAcceptedOrders = async (req, res) => {
  try {
    const acceptedOrders = await Order.find({ orderStatus: 'Accepted' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders: acceptedOrders });
  } catch (error) {
    console.error('Error fetching accepted orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch accepted orders' });
  }
};

exports.getCancelledOrders = async (req, res) => {
  try {
    const cancelledOrders = await Order.find({ orderStatus: 'Cancelled' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders: cancelledOrders });
  } catch (error) {
    console.error('Error fetching Cancelled orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch Cancelled orders' });
  }
};

exports.getProcessingOrders = async (req, res) => {
  try {
    const processingOrders = await Order.find({ orderStatus: 'Processing' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders: processingOrders });
  } catch (error) {
    console.error('Error fetching Processing orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch Processing orders' });
  }
};




