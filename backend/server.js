const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { generalLimiter, orderLimiter } = require('./middleware/rateLimiter'); 

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use(generalLimiter);

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);                      // removed cartLimiter
app.use('/api/orders', orderLimiter, orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));