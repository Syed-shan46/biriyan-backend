const express = require('express');
const { createOrder, getOrders, getallOrders, acceptOrder, cancelOrder, getAcceptedOrders, getCancelledOrders, getProcessingOrders, checkHasOrderedBefore } = require('../controllers/orderController');
const { triggerIncomingCall } = require('../controllers/callController');
const { sendNotificationToAllUsers } = require('../controllers/notifications');

const OrderRouter = express.Router();

OrderRouter.post('/api/orders', createOrder);

OrderRouter.post('/api/accept-order', acceptOrder);

OrderRouter.post('/api/cancel-order', cancelOrder);

OrderRouter.post('/api/trigger-call/', triggerIncomingCall);

OrderRouter.get('/api/orders/:userId', getOrders);

OrderRouter.get('/api/all-orders', getallOrders);

OrderRouter.get('/api/accepted-orders', getAcceptedOrders);

OrderRouter.get('/api/cancelled-orders', getCancelledOrders);

OrderRouter.get('/api/processing-orders', getProcessingOrders);

OrderRouter.post('/api/send-notification', sendNotificationToAllUsers);

OrderRouter.get('/users/:userId/hasOrderedBefore', checkHasOrderedBefore);

module.exports = OrderRouter;