const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const authRoute = require('./routes/auth');
const checkoutRoute = require('./routes/stripe');

//Create express app
const app = express();

dotenv.config({
  path: "./config.env",
});

const buildPath = path.join(__dirname, 'client', 'build');

console.log('build folder: ', buildPath);

app.use(express.static(buildPath));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const connetionString = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(connetionString)
  .then(() => console.log("Connected to DB Successful"))
  .catch((error) => console.log(error));

app.get('/api/test', () => {
  console.log('test is successful');
});

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/auth', authRoute);
app.use('/api/checkout',checkoutRoute);

app.get('*', (request, response) => {
  response.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend Server Running on ${port}`);
});

