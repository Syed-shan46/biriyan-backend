const express = require('express');
const { createOrder, getOrders, getallOrders, acceptOrder } = require('../controllers/orderController');
const { triggerIncomingCall } = require('../controllers/callController');


const OrderRouter = express.Router();

OrderRouter.post('/api/orders', createOrder);

OrderRouter.get('/api/orders/:userId', getOrders);

OrderRouter.get('/api/all-orders', getallOrders);

OrderRouter.post('/api/accept-order', acceptOrder);

OrderRouter.post('/api/trigger-call/', triggerIncomingCall);


module.exports = OrderRouter;