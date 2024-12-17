const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const connectDB = require('./config/db');

const authRouter = require('./routes/authRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const bannerRouter = require('./routes/bannerRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const app = express();


app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.json());
app.use(authRouter);
app.use(categoryRouter);
app.use(bannerRouter);
app.use(productRouter);
app.use(orderRouter);



// Start the server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Connect DB
connectDB().then(() => {
  console.log('Database Connected Successfully')

}).catch((err) => {
  console.log('Failed to connect to the database:', err.message);
})