// server.js (Backend/server.js)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // ✅ Load .env at top

// Route files
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/UserRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes'); // or adminUserRoutes.js



const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/orders', orderRoutes);
app.use('/admin/users', adminUserRoutes);

// ✅ Start server with port from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
