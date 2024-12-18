
const Order = require('../models/order');
const User = require('../models/user');

exports.createOrder = async (req, res) => {
  try {
    const { userId, userName, phone, address, productName, quantity, category, image, totalAmount, paymentStatus } = req.body;
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
    });

    await newOrder.save();
    // Send order details email to admin
    console.log('Sending email to admin for order placement...');

    // **Step 2: Confirm successful order creation to the user (Optional)**
    console.log('Order placed successfully. Admin notified via email.');

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
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
    const order = await Order.findById(orderId).populate('userId', 'email userName');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const userEmail = order.userId?.email;
    const userName = order.userId?.name;

    // Update the order status to "Accepted"
    order.orderStatus = 'Accepted';
    await order.save();

    // **User Email Notification**: Send confirmation email to the user
    await sendUserOrderConfirmation({
      orderId: order._id,
      userEmail,
      userName,
      products: order.products,
      totalAmount: order.totalAmount,
    });

    console.log(`Order accepted, email sent to user: ${userEmail}`);
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




