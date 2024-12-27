// backend/notifications.js

const admin = require('./firebase');

// Function to send a notification to the admin app
async function sendOrderNotification(order) {
  const message = {
    notification: {
      title: 'New Order Received',
      body: `Order Received`,
    },
    data: {
      orderId: "something",
      userId: order.userId.toString(),
      totalAmount: order.totalAmount.toString(),
    },
    android: {
      notification: {
        sound: 'ring',  // Custom sound file name (without the extension)
      },
    },
    topic: 'admin-orders', // Topic for all admin devices
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

module.exports = {
  sendOrderNotification,
};
