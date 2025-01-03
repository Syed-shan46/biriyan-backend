const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const http = require('http');
const { initializeSocket } = require('./controllers/socketController');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
dotenv.config();

const server = http.createServer(app);
// Initialize Socket.IO
initializeSocket(server);

const authRouter = require('./routes/authRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const bannerRouter = require('./routes/bannerRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const restaurantRouter = require('./routes/restaurantRoutes');


app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.json());


// Use the routes
app.use(authRouter);
app.use(categoryRouter);
app.use(bannerRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(restaurantRouter);

// Start the server 
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Connect DB
connectDB().then(() => {
  console.log('Database Connected Successfully')

}).catch((err) => {
  console.log('Failed to connect to the database:', err.message);
})